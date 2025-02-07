const Transaction = require('../models/Transaction');
const SavingsAccount = require('../models/SavingsAccount');
const logger = require('../utils/logger'); // Custom logger for logging events

// Create a new transaction
const createTransaction = async (userId, type, amount, accountId, investmentId = null, loanId = null) => {
    try {
        const transaction = new Transaction({
            userId,
            type,
            amount,
            accountId,
            investmentId,
            loanId,
        });
        await transaction.logTransaction(); // Log the transaction
        logger.info(`Transaction created: ${type}, Amount: ${amount}, Account ID: ${accountId}`);
        return transaction;
    } catch (error) {
        logger.error('Error creating transaction:', error);
        throw error;
    }
};

// Get transaction details
const getTransactionDetails = async (transactionId) => {
    try {
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            throw new Error('Transaction not found');
        }
        return transaction;
    } catch (error) {
        logger.error('Error fetching transaction details:', error);
        throw error;
    }
};

// Get all transactions for a user
const getUser Transactions = async (userId) => {
    try {
        const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 }); // Sort by creation date
        return transactions;
    } catch (error) {
        logger.error('Error fetching user transactions:', error);
        throw error;
    }
};

// Delete a transaction
const deleteTransaction = async (transactionId) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(transactionId);
        if (!transaction) {
            throw new Error('Transaction not found');
        }
        logger.info(`Transaction deleted: ${transactionId}`);
        return transaction;
    } catch (error) {
        logger.error('Error deleting transaction:', error);
        throw error;
    }
};

// Exporting transaction-related services
module.exports = {
    createTransaction,
    getTransactionDetails,
    getUser Transactions,
    deleteTransaction,
};
