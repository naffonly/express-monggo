const {
    PrismaClient
} = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {
    validationResult
} = require('express-validator');

const prisma = new PrismaClient();


const register = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: false,
            message: 'validation error',
            error: errors.array()
        })
    }



    try {
        const emailExist = await prisma.user.findFirst({
            where: {
                email: req.body.email
            }
        })

        if (emailExist) {
            return res.status(400).json({
                status: false,
                message: "email already use"
            })
        }

        const usernameExist = await prisma.user.findFirst({
            where: {
                username: req.body.username
            }
        })

        if (usernameExist) {
            return res.status(400).json({
                status: false,
                message: "username already use"
            })
        }



        const hashPassword = await bcrypt.hash(req.body.password, 10);

        await prisma.user.create({
            data: {
                email: req.body.email,
                password: hashPassword,
                username: req.body.username
            }
        })

        res.status(200).json({
            status: true,
            message: 'success register user',
        })


    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: false,
            message: 'internal server error'
        })
    }
}


const login = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: false,
            message: 'validation error',
            error: errors.array()
        })
    }
    try {

        const user = await prisma.user.findFirst({
            where: {
                username: req.body.username
            }
        })

        if (!user) {
            return res.status(400).json({
                status: false,
                message: "authentication failed"
            })
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password)

        if (!passwordMatch) {
            return res.status(400).json({
                status: false,
                message: "authentication failed"
            })
        }

        const token = jwt.sign({
            userId: user.id
        }, 'secret', {
            expiresIn: '1h'
        });

        res.status(200).json({
            status: true,
            message: 'success login',
            token: token,
            user: user
        })
    } catch (error) {
        console.error(error)

        return res.status(500).json({
            status: false,
            message: 'internal server error'
        })
    }
}

module.exports = {
    register,
    login
}