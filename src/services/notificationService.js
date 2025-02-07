const Notification = require('../models/Notification');
const logger = require('../utils/logger'); // Custom logger for logging events

// Create a new notification
const createNotification = async (userId, message) => {
    try {
        const notification = await Notification.createNotification(userId, message);
        logger.info(`Notification created for user: ${userId}, Message: ${message}`);
        return notification;
    } catch (error) {
        logger.error('Error creating notification:', error);
        throw error;
    }
};

// Get all notifications for a user
const getUser Notifications = async (userId) => {
    try {
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }); // Sort by creation date
        return notifications;
    } catch (error) {
        logger.error('Error fetching user notifications:', error);
        throw error;
    }
};

// Mark a notification as read
const markNotificationAsRead = async (notificationId) => {
    try {
        const notification = await Notification.findById(notificationId);
        if (!notification) {
            throw new Error('Notification not found');
        }
        await notification.markAsRead();
        logger.info(`Notification marked as read: ${notificationId}`);
        return notification;
    } catch (error) {
        logger.error('Error marking notification as read:', error);
        throw error;
    }
};

// Delete a notification
const deleteNotification = async (notificationId) => {
    try {
        const notification = await Notification.findByIdAndDelete(notificationId);
        if (!notification) {
            throw new Error('Notification not found');
        }
        logger.info(`Notification deleted: ${notificationId}`);
        return notification;
    } catch (error) {
        logger.error('Error deleting notification:', error);
        throw error;
    }
};

// Exporting notification-related services
module.exports = {
    createNotification,
    getUser Notifications,
    markNotificationAsRead,
    deleteNotification,
};
