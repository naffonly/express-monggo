const expreess = require('express');
const router = expreess.Router();


const TestimonialController = require('../controllers/TestimonialController');
const {
    validatorTestimonial
} = require('../utils/validator');

router.get('/testimonials', TestimonialController.findTestimonial);
router.post('/testimonial', validatorTestimonial, TestimonialController.createTestimonial)
router.get('/:id/testimonial', TestimonialController.findTestimoniById)
router.put('/:id/testimonial', validatorTestimonial, TestimonialController.updateTestimoni)
router.delete('/:id/testimonial', TestimonialController.deleteTestimoni)

module.exports = router