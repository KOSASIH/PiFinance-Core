const Transaction = require('../models/Transaction');
const User = require('../models/User');
const logger = require('../utils/logger'); // Custom logger for logging events

// Define a class for Fraud Detection
class FraudDetectionService {
    constructor() {
        this.suspiciousThreshold = 10000; // Example threshold for suspicious transaction amount
        this.suspiciousActivityLog = []; // Array to log suspicious activities
    }

    // Monitor transactions for potential fraud
    async monitorTransactions() {
        try {
            const transactions = await Transaction.find().populate('userId'); // Fetch all transactions with user details
            transactions.forEach(transaction => {
                if (this.isSuspicious(transaction)) {
                    this.flagSuspiciousActivity(transaction);
                }
            });
            logger.info('Transaction monitoring completed.');
        } catch (error) {
            logger.error('Error monitoring transactions:', error);
            throw error;
        }
    }

    // Check if a transaction is suspicious
    isSuspicious(transaction) {
        // Example criteria for suspicious activity
        if (transaction.amount > this.suspiciousThreshold) {
            logger.warn(`Suspicious transaction detected: ${transaction.amount} by user: ${transaction.userId.username}`);
            return true;
        }
        return false;
    }

    // Flag suspicious activity
    flagSuspiciousActivity(transaction) {
        this.suspiciousActivityLog.push({
            transactionId: transaction._id,
            userId: transaction.userId._id,
            amount: transaction.amount,
            timestamp: transaction.createdAt,
        });
        logger.info(`Flagged suspicious activity for transaction: ${transaction._id}`);
    }

    // Get a report of suspicious activities
    getSuspiciousActivityReport() {
        return this.suspiciousActivityLog;
    }

    // Reset the suspicious activity log
    resetSuspiciousActivityLog() {
        this.suspiciousActivityLog = [];
        logger.info('Suspicious activity log has been reset.');
    }
}

// Exporting an instance of the Fraud Detection Service
const fraudDetectionService = new FraudDetectionService();
module.exports = fraudDetectionService;
