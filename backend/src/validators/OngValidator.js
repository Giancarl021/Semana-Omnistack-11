const {
    celebrate,
    Segments,
    Joi
} = require('celebrate');

module.exports = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        whatsapp: Joi.string().pattern(/\+\d{12,15}/),
        city: Joi.string().required(),
        uf: Joi.string().length(2).required()
    })
});