const axios = require('axios')
const statusCode = require('http-status-codes')
const crypto = require('crypto')
const {
    CALENDLY_CLIENT_ID,
    CALENDLY_CLIENT_SECRET,
    CALENDLY_REDIRECT_URI,
    CALENDLY_HOST_SLUG,
    CALENDLY_WEBHOOK_URL,
    CALENDLY_WEBHOOK_SECRET,
} = process.env

let accessTokenMemory = null

const getCalendlyAuthUrl = (req, res) => {
    const { event_name } = req.query
    const state = event_name || 'Internal Server Error Meeting'
    const authUrl = `https://auth.calendly.com/oauth/authorize?client_id=${CALENDLY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(CALENDLY_REDIRECT_URI)}&state=${state}`
    console.log(`Redirecting to: ${authUrl}`)
    res.redirect(authUrl)
}

const handleCalendlyOAuthRedirect = async (req, res) => {
    const { code, state } = req.query
    const eventToSchedule = state || 'Internal Server Error Meeting'

    if (!code) {
        console.error('Authorization code is missing')
        return res.status(statusCode.BAD_REQUEST).json({ error: 'Authorization code is required' })
    }

    try {
        console.log('Exchanging code for token...')
        const tokenResponse = await axios.post('https://auth.calendly.com/oauth/token', {
            grant_type: 'authorization_code',
            client_id: CALENDLY_CLIENT_ID,
            client_secret: CALENDLY_CLIENT_SECRET,
            redirect_uri: CALENDLY_REDIRECT_URI,
            code,
        })

        console.log('Token response:', tokenResponse.data)

        const { access_token } = tokenResponse.data
        accessTokenMemory = access_token
        req.session.accessToken = access_token

        const schedulingLink = `https://calendly.com/${CALENDLY_HOST_SLUG}`
        console.log(`Redirecting to scheduling link: ${schedulingLink}`)
        res.redirect(schedulingLink)

    } catch (error) {
        console.error('Error while exchanging code for access token:', error.message)
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            error: 'Failed to create scheduling link',
            details: error.response?.data || error.message,
        })
    }
}

const fetchHostEvents = async (req, res) => {
    if (!req.session.accessToken) {
        console.error('Access token is missing')
        return res.status(statusCode.UNAUTHORIZED).json({ error: 'Access token is missing' })
    }

    try {
        console.log('Fetching host events...')
        const response = await axios.get('https://api.calendly.com/event_types', {
            headers: {
                Authorization: `Bearer ${req.session.accessToken}`,
            },
        })

        console.log('Host events fetched:', response.data)
        res.json(response.data)

    } catch (error) {
        console.error('Error fetching host events:', error.message)
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            error: 'Failed to fetch host events',
            details: error.response?.data || error.message,
        })
    }
}

const verifyWebhookSignature = (req) => {
    const signature = req.headers['x-calendly-signature']
    const expectedSignature = crypto
        .createHmac('sha256', CALENDLY_WEBHOOK_SECRET)
        .update(JSON.stringify(req.body))
        .digest('hex')
    
    console.log('Received signature:', signature)
    console.log('Expected signature:', expectedSignature)

    return signature === expectedSignature
}

const calendlyWebHook = async (req, res) => {
    if (!verifyWebhookSignature(req)) {
        console.error('Invalid webhook signature')
        return res.status(400).json({ error: 'Invalid signature' })
    }

    const { accessToken } = req.session
    if (!accessToken) {
        console.error('No access token attached!')
        return res.status(statusCode.BAD_REQUEST).json({ message: 'No access token attached!' })
    }

    try {
        console.log('Creating webhook subscription...')
        const response = await axios.post(
            'https://api.calendly.com/webhook_subscriptions',
            {
                url: CALENDLY_WEBHOOK_URL,
                events: [
                    'invitee.created',
                    'invitee.canceled',
                    'invitee.rescheduled',
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )

        console.log('Webhook created successfully:', response.data)
        res.status(statusCode.OK).json({ message: 'Webhook created successfully!' })

    } catch (error) {
        console.error('Error creating webhook:', error.message)
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong while setting the webhook!',
            error: error.message,
        })
    }
}

const handleCalendlyWebhook = (req, res) => {
    const { event, payload } = req.body

    if (!event || !payload) {
        console.error('Invalid webhook payload:', req.body)
        return res.status(statusCode.BAD_REQUEST).json({ error: 'Invalid webhook payload' })
    }

    console.log(`Handling event: ${event}`)
    switch (event) {
        case 'invitee.created':
            console.info('Invitee created:', payload)
            break
        case 'invitee.canceled':
            console.info('Invitee canceled:', payload)
            break
        case 'invitee.rescheduled':
            console.info('Invitee rescheduled:', payload)
            break
        default:
            console.warn('Unhandled event:', event)
    }

    res.status(statusCode.OK).send('Webhook received')
}

module.exports = {
    getCalendlyAuthUrl,
    handleCalendlyOAuthRedirect,
    fetchHostEvents,
    calendlyWebHook,
    handleCalendlyWebhook,
}
