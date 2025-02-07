const SavingsAccount = require('../models/SavingsAccount');
const User = require('../models/User');
const logger = require('../utils/logger'); // Custom logger for logging events

// Create a new savings account
const createSavingsAccount = async (userId) => {
    try {
        const savingsAccount = new SavingsAccount({ userId });
        await savingsAccount.save();
        logger.info(`Savings account created for user: ${userId}`);
        return savingsAccount;
    } catch (error) {
        logger.error('Error creating savings account:', error);
        throw error;
    }
};

// Deposit money into the savings account
const depositMoney = async (accountId, amount) => {
    try {
        const savingsAccount = await SavingsAccount.findById(accountId);
        if (!savingsAccount) {
            throw new Error('Savings account not found');
        }
        const newBalance = await savingsAccount.deposit(amount);
        logger.info(`Deposited ${amount} into account: ${accountId}. New balance: ${newBalance}`);
        return newBalance;
    } catch (error) {
        logger.error('Error depositing money:', error);
        throw error;
    }
};

// Withdraw money from the savings account
const withdrawMoney = async (accountId, amount) => {
    try {
        const savingsAccount = await SavingsAccount.findById(accountId);
        if (!savingsAccount) {
            throw new Error('Savings account not found');
        }
        const newBalance = await savingsAccount.withdraw(amount);
        logger.info(`Withdrew ${amount} from account: ${accountId}. New balance: ${newBalance}`);
        return newBalance;
    } catch (error) {
        logger.error('Error withdrawing money:', error);
        throw error;
    }
};

// Get savings account details
const getSavingsAccountDetails = async (accountId) => {
    try {
        const savingsAccount = await SavingsAccount.findById(accountId);
        if (!savingsAccount) {
            throw new Error('Savings account not found');
        }
        return savingsAccount;
    } catch (error) {
        logger.error('Error fetching savings account details:', error);
        throw error;
    }
};

// Exporting savings account services
module.exports = {
    createSavingsAccount,
    depositMoney,
    withdrawMoney,
    getSavingsAccountDetails,
};
