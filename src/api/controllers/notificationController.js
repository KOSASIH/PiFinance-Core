const NotificationService = require('../services/notificationService');

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await NotificationService.getUser Notifications(req.user.id);
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.markAsRead = async (req, res) => {
    try {
        await NotificationService.markAsRead(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
