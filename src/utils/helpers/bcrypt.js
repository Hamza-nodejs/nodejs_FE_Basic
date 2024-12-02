const bcrypt = require('bcryptjs')

const passwordHashing = async (password) => {
    try {
        const saltRounds = parseInt(process.env.SALT_ROUNDS_NUMBER)  
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        console.log('Password after hashing:', hashedPassword)
        return hashedPassword
    } catch (error) {
        throw new Error('Error occurred while hashing the password')
    }
}

const verifyPassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword)
        return isMatch
    } catch (error) {
        throw new Error('Error while verifying the password')
    }
}

module.exports = {
    passwordHashing,
    verifyPassword
}
