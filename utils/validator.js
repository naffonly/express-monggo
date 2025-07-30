const {body} = require('express-validator');

const validatorTestimonial = [

    body('author').notEmpty().withMessage('author is required'),
    body('role').notEmpty().withMessage('role is required'),
    body('rating').isInt({min :1 , max :5}).notEmpty().withMessage('rating is required'),
    body('quote').notEmpty().withMessage('qoute is required'),
    body('avatar').notEmpty().withMessage('avatar is required')

]

const validatorUser = [
    body('email').notEmpty().withMessage('email is required'),
    body('username').notEmpty().withMessage('username is required'),
    body('password').notEmpty().withMessage('password is required')
]

const validationLogin = [
    body('username').notEmpty().withMessage('username is required'),
    body('password').notEmpty().withMessage('password is required')
]

module.exports = {validatorTestimonial,validatorUser,validationLogin}