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


const updatePhoneValidation = (req, res, next) => {
    const schema = yup.object({
        make: yup.string().optional(),
        model: yup.string().optional(),
        variant: yup.string().optional(),
    }).noUnknown(true, 'Only "make", "model", and "variant" are allowed')

    try {
        schema.validateSync(req.body, { abortEarly: false })
        next()
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            message: 'Validation error',
            errors: error.errors,
        })
    }
}

module.exports = {
    addPhoneValidation,
    updatePhoneValidation
}