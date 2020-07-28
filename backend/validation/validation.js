const Joi = require('@hapi/joi');

function validation(post) {
    const schema = Joi.object({
        FirstName: Joi.string().min(3).required(),
        LastName: Joi.string().min(3).required(),
        EmailName: Joi.string().required().email(),
        RoleName: Joi.string()
    });

    return schema.validate(post);
}

module.exports = validation;