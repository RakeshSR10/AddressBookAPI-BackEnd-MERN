const Joi = require('joi');

const validateSchema = Joi.object({
    firstName: Joi.string().min(2).max(17).pattern(new RegExp('[a-zA-Z]{3,20}')).required(),
    lastName: Joi.string().min(2).max(17).pattern(new RegExp('[a-zA-Z]{2,20}')).required(),
    email: Joi.string().email().pattern(new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")).required(),
    password: Joi.string().min(8).max(20).pattern(new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$")).required()
});

module.exports = validateSchema;