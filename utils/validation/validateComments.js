const Joi = require('joi');
const { AppError } = require('../errors/errors');

const commentValidation = Joi.object({
        text: Joi.string().required(),
});

const validateComment = (req, res, next) => {
    const { error } = commentValidation.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new AppError(msg, 400)
    } else {
        next();
    }
};

module.exports = validateComment