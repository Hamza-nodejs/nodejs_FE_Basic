const axios = require('axios')

const {
    CALENDLY_CLIENT_ID,
    CALENDLY_CLIENT_SECRET,
    CALENDLY_REDIRECT_URI,
} = process.env

let accessTokenMemory = null

const getCalendlyAuthUrl = (req, res) => {
    const authUrl = `https://auth.calendly.com/oauth/authorize?client_id=${CALENDLY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(CALENDLY_REDIRECT_URI)}`
    res.redirect(authUrl)
}

const handleCalendlyOAuthRedirect = async (req, res) => {
    const { code } = req.query

    if (!code) {
        return res.status(400).json({ error: 'Authorization code is required' })
    }

    try {
        const response = await axios.post('https://auth.calendly.com/oauth/token', {
            grant_type: 'authorization_code',
            client_id: CALENDLY_CLIENT_ID,
            client_secret: CALENDLY_CLIENT_SECRET,
            redirect_uri: CALENDLY_REDIRECT_URI,
            code,
        })

        const { access_token } = response.data

        accessTokenMemory = access_token

        console.log('Access Token Saved:', accessTokenMemory)

        const userName = req.user?.name || 'mh408800'
        const userEmail = req.user?.email || 'mh408800@gmail.com'

        const eventType = 'group'
        const schedulingPageUrl = `https://calendly.com/${userName}/${eventType}?prefill%5Bname%5D=${encodeURIComponent(userName)}&prefill%5Bemail%5D=${encodeURIComponent(userEmail)}`

        res.redirect(schedulingPageUrl)
    } catch (error) {
        console.error('Error exchanging code for tokens:', error.response?.data || error.message)
        res.status(500).json({ error: 'Failed to obtain access token' })
    }
}

module.exports = {
    getCalendlyAuthUrl,
    handleCalendlyOAuthRedirect,
}

// http://localhost:4000/calendly/schedule-meeting