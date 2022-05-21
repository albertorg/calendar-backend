/* 
    User routes / Auth
    host + /api/auth
*/ 


const { Router } = require('express')
const {check} = require('express-validator')
const router = Router()

const {createUser, loginUser, revalidateToken} = require('../controllers/auth')
const { valiateFields } = require('../middlewares/fieldsValidator')


router.post(
    '/new',
    [   // Middlewares
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password most be of 6 characters').isLength({min: 6}),
        valiateFields
    ],
    createUser)

router.post(
    '/',
    [   // Middlewares
        check('email', 'Email is required').isEmail(),
        check('password', 'Password most be of 6 characters').isLength({ min: 6 }),
        valiateFields
    ],
    loginUser)

router.get('/renew', revalidateToken)
module.exports = router