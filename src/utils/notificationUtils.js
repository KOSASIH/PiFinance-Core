const emailUtils = require('./emailUtils'); // Import email utilities
const logger = require('./logger'); // Import logger utility

// Function to send a notification
const sendNotification = async (user, message, type = 'info') => {
    try {
        // Log the notification attempt
        logger.info(`Sending ${type} notification to ${user.email}: ${message}`);

        // Send email notification
        await emailUtils.sendNotificationEmail(user.email, message);

        // Log success
        logger.info(`Notification sent successfully to ${user.email}`);
    } catch (error) {
        // Log any errors that occur during notification sending
        logger.error(`Failed to send notification to ${user.email}: ${error.message}`);
    }
};

// Function to send a welcome notification
const sendWelcomeNotification = async (user) => {
    const message = `Welcome to PiFinance, ${user.username}! We're glad to have you on board.`;
    await sendNotification(user, message, 'welcome');
};

// Function to send a password reset notification
const sendPasswordResetNotification = async (user, resetLink) => {
    const message = `You requested a password reset. Click the link below to reset your password:\n${resetLink}`;
    await sendNotification(user, message, 'password_reset');
};

// Function to send a transaction alert
const sendTransactionAlert = async (user, transactionDetails) => {
    const message = `Your transaction of ${transactionDetails.amount} has been processed successfully. Transaction ID: ${transactionDetails.id}`;
    await sendNotification(user, message, 'transaction');
};

// Function to send a general notification
const sendGeneralNotification = async (user, notificationMessage) => {
    await sendNotification(user, notificationMessage, 'general');
};

// Exporting the notification utilities
module.exports = {
    sendNotification,
    sendWelcomeNotification,
    sendPasswordResetNotification,
    sendTransactionAlert,
    sendGeneralNotification,
};
