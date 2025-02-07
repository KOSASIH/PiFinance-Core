const Joi = require('joi');

const mintSchema = Joi.object({
    amount: Joi.number().positive().required(),
});

const redeemSchema = Joi.object({
    amount: Joi.number().positive().required(),
});

module.exports = {
    mintSchema,
    redeemSchema,
};
