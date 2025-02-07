const SavingsService = require('../services/savingsService');

exports.createSavingsAccount = async (req, res) => {
    try {
        const account = await SavingsService.createAccount(req.user.id);
        res.status(201).json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deposit = async (req, res) => {
    try {
        const updatedAccount = await SavingsService.deposit(req.user.id, req.body.amount);
        res.status(200).json(updatedAccount);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.withdraw = async (req, res) => {
    try {
        const updatedAccount = await SavingsService.withdraw(req.user.id, req.body.amount);
        res.status(200).json(updatedAccount);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
