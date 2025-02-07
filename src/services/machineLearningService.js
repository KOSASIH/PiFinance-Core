const { predictLoanDefault, predictInvestmentReturn } = require('../mlModels'); // Import your ML model functions
const User = require('../models/User');
const Loan = require('../models/Loan');
const Investment = require('../models/Investment');
const logger = require('../utils/logger'); // Custom logger for logging events

// Predict loan default risk for a user
const predictLoanDefaultRisk = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User  not found');
        }

        const loans = await Loan.find({ userId });
        const loanData = loans.map(loan => ({
            amount: loan.amount,
            interestRate: loan.interestRate,
            term: loan.term,
            status: loan.status,
        }));

        const prediction = await predictLoanDefault(loanData);
        logger.info(`Loan default risk predicted for user: ${userId}, Prediction: ${prediction}`);
        return prediction;
    } catch (error) {
        logger.error('Error predicting loan default risk:', error);
        throw error;
    }
};

// Predict investment return for a user
const predictInvestmentReturnForUser  = async (userId) => {
    try {
        const investments = await Investment.find({ userId });
        const investmentData = investments.map(investment => ({
            amount: investment.amount,
            assetType: investment.assetType,
            expectedReturn: investment.expectedReturn,
        }));

        const prediction = await predictInvestmentReturn(investmentData);
        logger.info(`Investment return predicted for user: ${userId}, Prediction: ${prediction}`);
        return prediction;
    } catch (error) {
        logger.error('Error predicting investment return:', error);
        throw error;
    }
};

// Exporting machine learning-related services
module.exports = {
    predictLoanDefaultRisk,
    predictInvestmentReturnForUser ,
};
