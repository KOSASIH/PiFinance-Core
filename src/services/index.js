// src/services/index.js

const userService = require('./userService');
const savingsService = require('./savingsService');
const loanService = require('./loanService');
const investmentService = require('./investmentService');
const notificationService = require('./notificationService');
const transactionService = require('./transactionService');
const analyticsService = require('./analyticsService');
const machineLearningService = require('./machineLearningService');
const complianceService = require('./complianceService');
const stablecoinService = require('./stablecoinService');
const collateralManager = require('./collateralManager');
const priceOracle = require('./priceOracle');
const stabilizationMechanism = require('./stabilizationMechanism');
const fraudDetectionService = require('./fraudDetectionService');
const userBehaviorService = require('./userBehaviorService');
const blockchainService = require('./blockchainService'); // Import the blockchain service

module.exports = {
    userService,
    savingsService,
    loanService,
    investmentService,
    notificationService,
    transactionService,
    analyticsService,
    machineLearningService,
    complianceService,
    stablecoinService,
    collateralManager,
    priceOracle,
    stabilizationMechanism,
    fraudDetectionService,
    userBehaviorService,
    blockchainService, // Export the blockchain service
};
