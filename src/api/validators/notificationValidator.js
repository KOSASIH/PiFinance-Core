const Joi = require('joi');

const notificationSchema = Joi.object({
    userId: Joi.string().required(),
    message: Joi.string().max(255).required(),
});

module.exports = {
    notificationSchema,
};
