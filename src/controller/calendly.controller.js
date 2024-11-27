const axios = require('axios')
const statusCode = require('http-status-codes')
const {
    CALENDLY_CLIENT_ID,
    CALENDLY_CLIENT_SECRET,
    CALENDLY_REDIRECT_URI,
    CALENDLY_HOST_SLUG
} = process.env

let accessTokenMemory = null

const getCalendlyAuthUrl = (req, res) => {
    const authUrl = `https://auth.calendly.com/oauth/authorize?client_id=${CALENDLY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(CALENDLY_REDIRECT_URI)}`
    console.info('Redirecting user to Calendly OAuth URL:', authUrl)
    res.redirect(authUrl)
}

const handleCalendlyOAuthRedirect = async (req, res) => {
    const { code } = req.query
    const { event_name } = req.body

    if (!code) {
        console.error('Authorization code missing.')
        return res.status(statusCode.BAD_REQUEST).json({ error: 'Authorization code is required' })
    }

    const eventToSchedule = event_name || 'Internal Server Error Meeting'
    console.debug('event-------', eventToSchedule)

    try {
        // console.info('Exchanging authorization code for access token...')

        const tokenResponse = await axios.post('https://auth.calendly.com/oauth/token', {
            grant_type: 'authorization_code',
            client_id: CALENDLY_CLIENT_ID,
            client_secret: CALENDLY_CLIENT_SECRET,
            redirect_uri: CALENDLY_REDIRECT_URI,
            code,
        })

        const { access_token } = tokenResponse.data
        accessTokenMemory = access_token
        req.session.accessToken = access_token

        // console.info('Access token retrieved:', access_token)

        const schedulingLink = `https://calendly.com/${CALENDLY_HOST_SLUG}`

        // console.info('Generated scheduling link:', schedulingLink)

        res.redirect(schedulingLink)

    } catch (error) {
        console.error('Error during OAuth exchange or scheduling link generation:', error.response?.data || error.message)
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            error: 'Failed to create scheduling link',
            details: error.response?.data || error.message,
        })
    }
}

const fetchHostEvents = async (req, res) => {
    if (!req.session.accessToken) {
        return res.status(statusCode.UNAUTHORIZED).json({ error: 'Access token is missing' })
    }

    try {
        const response = await axios.get('https://api.calendly.com/event_types', {
            headers: {
                Authorization: `Bearer ${req.session.accessToken}`,
            },
        })

        console.info('Host Events:', response.data)
        res.json(response.data)

    } catch (error) {
        console.error('Error fetching host events:', error.response?.data || error.message)
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            error: 'Failed to fetch host events',
            details: error.response?.data || error.message,
        })
    }
}


module.exports = {
    getCalendlyAuthUrl,
    handleCalendlyOAuthRedirect,
    fetchHostEvents,
}
