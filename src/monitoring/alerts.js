// src/monitoring/alerts.js

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Replace with your email
        pass: 'your-email-password',    // Replace with your email password
    },
});

// Function to send an alert email
function sendAlert(subject, message) {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'recipient-email@example.com', // Replace with recipient email
        subject: subject,
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error sending alert:', error);
        }
        console.log('Alert sent:', info.response);
    });
}

// Function to check for high error rates
function checkErrorRate(errorCount, requestCount) {
    const errorRate = errorCount / requestCount;
    if (errorRate > 0.1) { // Example threshold of 10%
        sendAlert('High Error Rate Alert', `Current error rate is ${errorRate * 100}%`);
    }
}

module.exports = {
    sendAlert,
    checkErrorRate,
};
