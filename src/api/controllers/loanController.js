const LoanService = require('../services/loanService');

exports.applyForLoan = async (req, res) => {
    try {
        const loan = await LoanService.apply(req.user.id, req.body);
        res.status(201).json(loan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.repayLoan = async (req, res) => {
    try {
        const updatedLoan = await LoanService.repay(req.user.id, req.body.loanId, req.body.amount);
        res.status(200).json(updatedLoan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
