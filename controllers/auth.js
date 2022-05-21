const {response} = require('express')
const bycrypt = require('bcryptjs')
const User = require('../models/user-model')
const {generateJWT} = require('../helpers/jwt')

const createUser = async(req, res = response) => {

    const {email, password} = req.body
    
    try {
        let user = await User.findOne({email})

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'User already exists with this email'
            })
        }

        user = new User(req.body)

        // Encrypt password
        const salt = bycrypt.genSaltSync()
        user.password = bycrypt.hashSync(password, salt)
        
        await user.save()

        // Generate JWT (Json Web Token)
        const token = await generateJWT(user.id, user.name)
        
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please contact Admin'
        })
    }
    
}

const loginUser = async(req, res = response) => {

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "User don't exist"
            })
        }

        // Pasword confirm
        const validPassword = bycrypt.compareSync(password, user.password)

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect password'
            })
        }

        // Generate JWT (Json Web Token)
        const token = await generateJWT(user.id, user.name)

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please contact Admin'
        })
    }
    
}

const revalidateToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'renew'
    })
}


module.exports = {
    createUser,
    loginUser,
    revalidateToken
}