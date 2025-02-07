const Joi = require('joi');

const savingsAccountSchema = Joi.object({
    userId: Joi.string().required(),
});

const depositSchema = Joi.object({
    amount: Joi.number().positive().required(),
});

const withdrawSchema = Joi.object({
    amount: Joi.number().positive().required(),
});

module.exports = {
    savingsAccountSchema,
    depositSchema,
    withdrawSchema,
};
