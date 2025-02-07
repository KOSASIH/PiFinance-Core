const User = require('../models/User');
const Transaction = require('../models/Transaction');
const logger = require('../utils/logger'); // Custom logger for logging events

// Define a class for User Behavior Analysis
class UserBehaviorService {
    constructor() {
        this.transactionThreshold = 1000; // Example threshold for significant transactions
    }

    // Analyze user behavior based on transaction history
    async analyzeUser Behavior(userId) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User  not found');
            }

            const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });
            const behaviorAnalysis = this.performBehaviorAnalysis(transactions);

            logger.info(`Behavior analysis completed for user: ${userId}`);
            return {
                userId,
                username: user.username,
                behaviorAnalysis,
            };
        } catch (error) {
            logger.error('Error analyzing user behavior:', error);
            throw error;
        }
    }

    // Perform behavior analysis based on transaction data
    performBehaviorAnalysis(transactions) {
        const analysis = {
            totalTransactions: transactions.length,
            totalSpent: 0,
            significantTransactions: 0,
            averageTransactionValue: 0,
        };

        if (transactions.length > 0) {
            analysis.totalSpent = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
            analysis.significantTransactions = transactions.filter(transaction => transaction.amount > this.transactionThreshold).length;
            analysis.averageTransactionValue = analysis.totalSpent / transactions.length;
        }

        return analysis;
    }

    // Get personalized recommendations based on user behavior
    getPersonalizedRecommendations(behaviorAnalysis) {
        const recommendations = [];

        if (behaviorAnalysis.significantTransactions > 5) {
            recommendations.push('Consider exploring premium features for frequent users.');
        }

        if (behaviorAnalysis.averageTransactionValue > 500) {
            recommendations.push('You might be interested in investment opportunities with higher returns.');
        }

        return recommendations;
    }
}

// Exporting an instance of the User Behavior Service
const userBehaviorService = new UserBehaviorService();
module.exports = userBehaviorService;
