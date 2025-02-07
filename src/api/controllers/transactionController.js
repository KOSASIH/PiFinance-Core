const TransactionService = require('../services/transactionService');

exports.getTransactionHistory = async (req, res) => {
    try {
        const transactions = await TransactionService.getHistory(req.user.id);
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
