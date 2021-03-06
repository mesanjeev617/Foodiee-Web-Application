//Validating data inputs

const Joi = require('@hapi/joi');
const { model } = require('mongoose');

//Registration validation

const registerValidation = (data) => {
    const schema = Joi.object({
        firstname: Joi.string().min(3).required(),
        lastname: Joi.string().min(3).required(),
        email: Joi.string().min(6).email(),
        password : Joi.string().min(6).required()

    });
    return schema.validate(data)
};

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).email(),
        password : Joi.string().min(6).required()

    });
    return schema.validate(data)
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;