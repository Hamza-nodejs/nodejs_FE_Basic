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
        // console.log('Access Token Saved:', accessTokenMemory)

        const userResponse = await axios.get('https://api.calendly.com/users/me', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })

        console.log('User Response:', userResponse.data)

        const userSlug = userResponse.data.resource?.slug

        // console.log('User Slug:', userSlug)

        const schedulingLink = `https://calendly.com/${userSlug}`

        res.redirect(schedulingLink)
    } catch (error) {
        console.error('Error exchanging code for tokens or creating scheduling link:', error.response?.data || error.message)
        res.status(500).json({ error: 'Failed to create scheduling link' })
    }
}

module.exports = {
    getCalendlyAuthUrl,
    handleCalendlyOAuthRedirect,
}
