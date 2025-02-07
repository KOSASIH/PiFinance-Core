const Loan = require('../models/Loan');
const User = require('../models/User');
const logger = require('../utils/logger'); // Custom logger for logging events

// Create a new loan
const createLoan = async (userId, loanData) => {
    try {
        const loan = new Loan({
            userId,
            ...loanData,
        });
        await loan.save();
        logger.info(`Loan created for user: ${userId}, Amount: ${loanData.amount}`);
        return loan;
    } catch (error) {
        logger.error('Error creating loan:', error);
        throw error;
    }
};

// Approve a loan
const approveLoan = async (loanId) => {
    try {
        const loan = await Loan.findById(loanId);
        if (!loan) {
            throw new Error('Loan not found');
        }
        await loan.approve();
        logger.info(`Loan approved: ${loanId}`);
        return loan;
    } catch (error) {
        logger.error('Error approving loan:', error);
        throw error;
    }
};

// Reject a loan
const rejectLoan = async (loanId) => {
    try {
        const loan = await Loan.findById(loanId);
        if (!loan) {
            throw new Error('Loan not found');
        }
        await loan.reject();
        logger.info(`Loan rejected: ${loanId}`);
        return loan;
    } catch (error) {
        logger.error('Error rejecting loan:', error);
        throw error;
    }
};

// Make a loan repayment
const makeRepayment = async (loanId, amount) => {
    try {
        const loan = await Loan.findById(loanId);
        if (!loan) {
            throw new Error('Loan not found');
        }
        // Assuming you have a method to handle repayments in the Loan model
        // This could also involve updating the balance or status of the loan
        loan.amount -= amount; // Example logic, adjust as needed
        await loan.markAsPaid(); // Mark the loan as paid if fully repaid
        logger.info(`Repayment of ${amount} made for loan: ${loanId}`);
        return loan;
    } catch (error) {
        logger.error('Error making loan repayment:', error);
        throw error;
    }
};

// Get loan details
const getLoanDetails = async (loanId) => {
    try {
        const loan = await Loan.findById(loanId);
        if (!loan) {
            throw new Error('Loan not found');
        }
        return loan;
    } catch (error) {
        logger.error('Error fetching loan details:', error);
        throw error;
    }
};

// Exporting loan-related services
module.exports = {
    createLoan,
    approveLoan,
    rejectLoan,
    makeRepayment,
    getLoanDetails,
};
