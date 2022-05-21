const {response} = require('express')
const {validationResult} = require('express-validator')

const valiateFields = (req , res = response, next) => {
   
    // Handle errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    next()
}

module.exports = {
    valiateFields
}