const Joi = require('joi');

const loanApplicationSchema = Joi.object({
    amount: Joi.number().positive().required(),
    term: Joi.number().integer().min(1).required(), // Loan term in months
    purpose: Joi.string().max(100).required(),
});

const loanRepaymentSchema = Joi.object({
    loanId: Joi.string().required(),
    amount: Joi.number().positive().required(),
});

module.exports = {
    loanApplicationSchema,
    loanRepaymentSchema,
};
