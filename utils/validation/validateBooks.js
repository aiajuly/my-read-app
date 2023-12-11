const Joi = require('joi');
const { AppError } = require('../errors/errors');

const bookValidation = Joi.object({
        bookName: Joi.string().required(),
        author: Joi.string().required(),
        imageUrl: Joi.string().required(),
        description: Joi.string().required()
});

const validateBooks = (req, res, next) => {
    const { error } = bookValidation.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new AppError(msg, 400)
    } else {
        next();
    }
};

module.exports = validateBooks