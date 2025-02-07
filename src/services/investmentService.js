const Investment = require('../models/Investment');
const User = require('../models/User');
const logger = require('../utils/logger'); // Custom logger for logging events

// Create a new investment
const createInvestment = async (userId, investmentData) => {
    try {
        const investment = new Investment({
            userId,
            ...investmentData,
        });
        await investment.save();
        logger.info(`Investment created for user: ${userId}, Amount: ${investmentData.amount}, Asset Type: ${investmentData.assetType}`);
        return investment;
    } catch (error) {
        logger.error('Error creating investment:', error);
        throw error;
    }
};

// Get investment details
const getInvestmentDetails = async (investmentId) => {
    try {
        const investment = await Investment.findById(investmentId);
        if (!investment) {
            throw new Error('Investment not found');
        }
        return investment;
    } catch (error) {
        logger.error('Error fetching investment details:', error);
        throw error;
    }
};

// Update investment status
const updateInvestmentStatus = async (investmentId, newStatus) => {
    try {
        const investment = await Investment.findById(investmentId);
        if (!investment) {
            throw new Error('Investment not found');
        }
        investment.status = newStatus; // Update the status
        investment.updatedAt = Date.now(); // Update the timestamp
        await investment.save(); // Save the updated investment
        logger.info(`Investment status updated: ${investmentId}, New Status: ${newStatus}`);
        return investment;
    } catch (error) {
        logger.error('Error updating investment status:', error);
        throw error;
    }
};

// Calculate expected return
const calculateExpectedReturn = async (investmentId, rateOfReturn) => {
    try {
        const investment = await Investment.findById(investmentId);
        if (!investment) {
            throw new Error('Investment not found');
        }
        const expectedReturn = investment.calculateExpectedReturn(rateOfReturn);
        logger.info(`Calculated expected return for investment: ${investmentId}, Expected Return: ${expectedReturn}`);
        return expectedReturn;
    } catch (error) {
        logger.error('Error calculating expected return:', error);
        throw error;
    }
};

// Exporting investment-related services
module.exports = {
    createInvestment,
    getInvestmentDetails,
    updateInvestmentStatus,
    calculateExpectedReturn,
};
