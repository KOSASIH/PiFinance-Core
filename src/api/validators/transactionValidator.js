const Joi = require('joi');

const transactionHistorySchema = Joi.object({
    userId: Joi.string().required(),
});

module.exports = {
    transactionHistorySchema,
};
