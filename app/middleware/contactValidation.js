const Joi = require('joi');

//Joi validation for Data
const validateSchema = Joi.object({
    firstName: Joi.string().min(2).max(17).pattern(new RegExp('[a-zA-Z]{3,20}')).required(),
    lastName: Joi.string().min(2).max(17).pattern(new RegExp('[a-zA-Z]{2,20}')).required(),
    address: Joi.string().min(2).max(25).pattern(new RegExp('^[a-zA-Z]{2,}')).required(),
    city: Joi.string().min(2).max(20).pattern(new RegExp('^[a-zA-Z]{2,}')).required(),
    state: Joi.string().min(2).max(25).pattern(new RegExp('^[a-zA-Z]{2,}')).required(),
    phone: Joi.string().min(10).max(10).pattern(new RegExp('^[0-9]{2,}')).required(),
    email: Joi.string().email().pattern(new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")).required(),
    zip: Joi.string().min(2).max(15).pattern(new RegExp('^[0-9]{2,}')).required()    
}) 

module.exports = validateSchema;