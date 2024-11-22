const yup = require('yup')

const addPhoneValidation = (req, res, next) => {
    const schema = yup.object({
        make: yup.string().required('Make is required'),
        model: yup.string().required('Model is required'),
        variant: yup.string().required('Variant is required'),
    })

    try {
        schema.validateSync(req.body, { abortEarly: false })
        next()
    } catch (error) {
        res.status(400).json({ error: error.errors })
    }
}

module.exports = {
    addPhoneValidation
}