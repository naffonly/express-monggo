const {
    PrismaClient
} = require('@prisma/client');
const { validationResult } = require('express-validator');

const prisma = new PrismaClient();



const getUsers = async function (req,res) {
    
    try {
        const users = await prisma.user.findMany({
            select :{
                id : true,
                email : true,
                username : true,
            }
        })

        res.status(200).json({
                status : true,
                message : "success get data",
                data : users
            })
    } catch (error) {
        return res.status(500).json({
            status : false,
            message : "internal server error"
        })
    }
}

module.exports = {
    getUsers,
}