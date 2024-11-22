const getAllPhones = async (req, res) => {
    res.end('hello from endpoint')
}

const addPhone = async (req, res) => {
    res.end('phone added')
}

const updatePhone = async (req, res) => {
    res.end('phone updated')
}

const deletePhone = async (req, res) => {
    res.end('phone deleted')
}

module.exports = {
    getAllPhones,
    addPhone,
    updatePhone,
    deletePhone
}