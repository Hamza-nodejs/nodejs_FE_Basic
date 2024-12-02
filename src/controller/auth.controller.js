const statusCode = require("http-status-codes");
const { passwordHashing, verifyPassword } = require("../utils/helpers/bcrypt");
const User = require("../models/user.model")


exports.registerUser = async (req, res) => {
    try {
        const { name, password, email } = req.body;
        if (!name || !password || !email) {
            return res.status(statusCode.BAD_REQUEST).json({ statusCode: statusCode.BAD_REQUEST, message: "req.body is missing" })
        }
        const hashPassword = await passwordHashing(password);
        const newUser = await User.create({
            name: name,
            email: email,
            password: hashPassword
        })
        return res.status(statusCode.CREATED).json({ statusCode: statusCode.CREATED, message: "user register successfully!" })
    } catch (error) {
        console.error("error occured:", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ statusCode: statusCode.INTERNAL_SERVER_ERROR, message: "something went wrong", error: error.message })
    }

}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(statusCode.BAD_REQUEST).json({ statusCode: statusCode.BAD_REQUEST, message: "req.body is missing" })
        }
        const userExist = await User.findOne({ email })
        if (!userExist) {
            return res.status(statusCode.BAD_REQUEST).json({ statusCode: statusCode.BAD_REQUEST, message: "Invalid email entered" })
        }
        const passwordCheck = await verifyPassword(password, userExist?.password)
        if (!passwordCheck) {
            return res.status(statusCode.BAD_REQUEST).json({ statusCode: statusCode.BAD_REQUEST, message: "Incorrect Password entered" })
        }
        // storing the user in the session
        req.session.user = { id: userExist?._id, name: userExist?.name }
        return res.status(statusCode.OK).json({statusCode: statusCode.OK, message: "login successfully", data: })


    } catch (error) {
        console.error("error in login", error)
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ statusCode: statusCode.INTERNAL_SERVER_ERROR, message: "something went wrong", error: error.message })
    }
}
