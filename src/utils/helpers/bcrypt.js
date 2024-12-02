const bcrypt = require("bcryptjs")

const passwordHashing = async (password) => {
    try {
        const saltRounds = process.env.SALT_ROUNDS_NUMBER
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        console.log("password after hashed", hashedPassword)
        return hashedPassword
    } catch (error) {
        throw new error("error occured while hashing the password")
    }
}

const verifyPassword = async (passord, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(passord, hashedPassword)
        return isMatch
    } catch (error) {
        throw new error("error while doing verification of password")
    }
}

module.exports = {
    passwordHashing,
    verifyPassword
}