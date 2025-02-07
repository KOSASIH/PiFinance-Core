const mongoose = require('mongoose');

// Define the Notification schema
const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User ', // Reference to the User model
    },
    message: {
        type: String,
        required: true, // Notification message
    },
    isRead: {
        type: Boolean,
        default: false, // Default status is unread
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Method to mark the notification as read
notificationSchema.methods.markAsRead = async function() {
    this.isRead = true; // Set the notification as read
    this.updatedAt = Date.now(); // Update the timestamp
    await this.save(); // Save the updated notification
    return this; // Return the updated notification
};

// Method to create a new notification
notificationSchema.statics.createNotification = async function(userId, message) {
    const notification = new this({
        userId,
        message,
    });
    await notification.save(); // Save the new notification
    return notification; // Return the created notification
};

// Create the Notification model
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
