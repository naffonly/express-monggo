const {
    PrismaClient
} = require('@prisma/client');
const { validationResult } = require('express-validator');

const prisma = new PrismaClient();

const findTestimonial = async  (req, res) => {
    try {
        const testimonials = await prisma.testimoni.findMany({
            select: {
                id: true,
                author: true,
                role: true,
                rating: true,
                quote: true,
                avatar: true
            },
            orderBy: {
                rating: 'desc',
            },
        });

        res.status(200).json({
            status: true,
            messager: 'succes get data',
            data: testimonials
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            message: "Internal Server error"
        })
    }
}

const createTestimonial = async  (req,res) => {
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        return res.status(422).json({
            status : false,
            message : "validation errpr",
            errors : errors.array(), 
        })
    }

    try {
        const testimoni = await prisma.testimoni.create({
            data: {
                author : req.body.author,
                quote : req.body.quote,
                role : req.body.role,
                rating: req.body.rating,
                avatar : req.body.avatar
            }
        }) 

        res.status(200).json({
            status : true,
            message : "Success save data",
            data : testimoni
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status : false,
            message : "Internal server error",
        })
    }
}

const findTestimoniById = async  (req,res) => {

    const {id} = req.params

    try {
        
        const post = await prisma.testimoni.findUnique({
            where : {
                id : id
            },
            select : {
                id: true,
                author : true,
                avatar : true,
                quote : true,
                rating : true,
                role  : true,
            }
        })


        res.status(200).json({
            status : true,
            message : `get data by ${id} success`,
            data : post,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status : false,
            message : "internal server error"
        })
    }
    
}

const updateTestimoni = async (req,res) => {
    
    const {id} = req.params

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            status : false,
            message : "validation error",
            errors: errors.array()
        })
    }

    try {
        
        const testimoni = await prisma.testimoni.update({
            where : {
                 id : id
            },
            data : {
                author : req.body.author,
                avatar : req.body.avatar,
                quote : req.body.quote,
                rating : req.body.rating,
                role : req.body.role,
            }
        })

        res.status(200).json({
            status : true,
            message : "success update data",
            data : testimoni
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            status : false,
            message : "Internal server error",
        })
    }
}


const deleteTestimoni = async (req,res) => {
    
    const {id} = req.params

    try {
        await prisma.testimoni.delete({
        where : {
            id: id,
        }
    })

    res.status(200).json({
        status : true,
        message: `delete data id ${id} susccess`
    })
    } catch (error) {
       console.log(error);

       return res.status(500).json({
        status : false,
        message : "internal server error",
       })
        
    }


    

}
module.exports = {
    findTestimonial,
    createTestimonial,
    findTestimoniById,
    updateTestimoni,
    deleteTestimoni
}