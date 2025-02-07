const Collateral = require('../models/Collateral'); // Assuming you have a Collateral model
const Loan = require('../models/Loan');
const User = require('../models/User');
const logger = require('../utils/logger'); // Custom logger for logging events

// Add collateral for a user
const addCollateral = async (userId, collateralData) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User  not found');
        }

        const collateral = new Collateral({
            userId,
            ...collateralData,
        });
        await collateral.save();
        logger.info(`Collateral added for user: ${userId}, Collateral ID: ${collateral._id}`);
        return collateral;
    } catch (error) {
        logger.error('Error adding collateral:', error);
        throw error;
    }
};

// Remove collateral for a user
const removeCollateral = async (collateralId) => {
    try {
        const collateral = await Collateral.findByIdAndDelete(collateralId);
        if (!collateral) {
            throw new Error('Collateral not found');
        }
        logger.info(`Collateral removed: ${collateralId}`);
        return collateral;
    } catch (error) {
        logger.error('Error removing collateral:', error);
        throw error;
    }
};

// Check collateral status for a user
const checkCollateralStatus = async (userId) => {
    try {
        const collaterals = await Collateral.find({ userId });
        if (!collaterals.length) {
            logger.info(`No collateral found for user: ${userId}`);
            return { userId, collaterals: [], totalValue: 0 };
        }

        const totalValue = collaterals.reduce((acc, collateral) => acc + collateral.value, 0);
        logger.info(`Collateral status checked for user: ${userId}, Total Value: ${totalValue}`);
        return { userId, collaterals, totalValue };
    } catch (error) {
        logger.error('Error checking collateral status:', error);
        throw error;
    }
};

// Get collateral for a specific loan
const getCollateralForLoan = async (loanId) => {
    try {
        const loan = await Loan.findById(loanId).populate('collateralId'); // Assuming Loan has a collateralId field
        if (!loan) {
            throw new Error('Loan not found');
        }
        logger.info(`Collateral retrieved for loan: ${loanId}`);
        return loan.collateralId;
    } catch (error) {
        logger.error('Error retrieving collateral for loan:', error);
        throw error;
    }
};

// Exporting collateral management services
module.exports = {
    addCollateral,
    removeCollateral,
    checkCollateralStatus,
    getCollateralForLoan,
};
