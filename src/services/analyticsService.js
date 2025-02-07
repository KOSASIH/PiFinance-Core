const Transaction = require('../models/Transaction');
const Investment = require('../models/Investment');
const Loan = require('../models/Loan');
const SavingsAccount = require('../models/SavingsAccount');
const logger = require('../utils/logger'); // Custom logger for logging events

// Get total transactions for a user
const getTotalTransactions = async (userId) => {
    try {
        const transactions = await Transaction.find({ userId });
        const totalAmount = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
        logger.info(`Total transactions calculated for user: ${userId}, Total Amount: ${totalAmount}`);
        return totalAmount;
    } catch (error) {
        logger.error('Error calculating total transactions:', error);
        throw error;
    }
};

// Get investment summary for a user
const getInvestmentSummary = async (userId) => {
    try {
        const investments = await Investment.find({ userId });
        const totalInvested = investments.reduce((acc, investment) => acc + investment.amount, 0);
        const totalExpectedReturn = investments.reduce((acc, investment) => acc + investment.expectedReturn, 0);
        logger.info(`Investment summary calculated for user: ${userId}, Total Invested: ${totalInvested}, Total Expected Return: ${totalExpectedReturn}`);
        return {
            totalInvested,
            totalExpectedReturn,
            investmentCount: investments.length,
        };
    } catch (error) {
        logger.error('Error fetching investment summary:', error);
        throw error;
    }
};

// Get loan summary for a user
const getLoanSummary = async (userId) => {
    try {
        const loans = await Loan.find({ userId });
        const totalLoanAmount = loans.reduce((acc, loan) => acc + loan.amount, 0);
        const totalPaid = loans.reduce((acc, loan) => acc + (loan.status === 'paid' ? loan.amount : 0), 0);
        logger.info(`Loan summary calculated for user: ${userId}, Total Loan Amount: ${totalLoanAmount}, Total Paid: ${totalPaid}`);
        return {
            totalLoanAmount,
            totalPaid,
            loanCount: loans.length,
        };
    } catch (error) {
        logger.error('Error fetching loan summary:', error);
        throw error;
    }
};

// Get savings account summary for a user
const getSavingsAccountSummary = async (userId) => {
    try {
        const savingsAccounts = await SavingsAccount.find({ userId });
        const totalBalance = savingsAccounts.reduce((acc, account) => acc + account.balance, 0);
        logger.info(`Savings account summary calculated for user: ${userId}, Total Balance: ${totalBalance}`);
        return {
            totalBalance,
            accountCount: savingsAccounts.length,
        };
    } catch (error) {
        logger.error('Error fetching savings account summary:', error);
        throw error;
    }
};

// Exporting analytics-related services
module.exports = {
    getTotalTransactions,
    getInvestmentSummary,
    getLoanSummary,
    getSavingsAccountSummary,
};
