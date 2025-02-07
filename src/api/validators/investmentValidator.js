const Joi = require('joi');

const investmentSchema = Joi.object({
    userId: Joi.string().required(),
    amount: Joi.number().positive().required(),
    assetType: Joi.string().valid('stocks', 'bonds', 'crypto').required(),
});

module.exports = {
    investmentSchema,
};
