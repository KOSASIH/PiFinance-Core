const nodemailer = require('nodemailer');

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // Replace with your SMTP server
    port: 587, // Replace with your SMTP port
    secure: false, // Set to true if using port 465
    auth: {
        user: 'your-email@example.com', // Replace with your email
        pass: 'your-email-password', // Replace with your email password
    },
});

// Function to send an email
const sendEmail = async (to, subject, text, html) => {
    const mailOptions = {
        from: '"PiFinance" <your-email@example.com>', // Sender address
        to, // Recipient address
        subject, // Subject line
        text, // Plain text body
        html, // HTML body
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: %s', info.messageId);
        return info; // Return the info object for further processing if needed
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};

// Function to send a welcome email
const sendWelcomeEmail = async (to, username) => {
    const subject = 'Welcome to PiFinance!';
    const text = `Hello ${username},\n\nWelcome to PiFinance! We are excited to have you on board.`;
    const html = `<p>Hello ${username},</p><p>Welcome to PiFinance! We are excited to have you on board.</p>`;
    return sendEmail(to, subject, text, html);
};

// Function to send a password reset email
const sendPasswordResetEmail = async (to, resetLink) => {
    const subject = 'Password Reset Request';
    const text = `You requested a password reset. Click the link below to reset your password:\n${resetLink}`;
    const html = `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetLink}">${resetLink}</a></p>`;
    return sendEmail(to, subject, text, html);
};

// Function to send a notification email
const sendNotificationEmail = async (to, message) => {
    const subject = 'Notification from PiFinance';
    const text = message;
    const html = `<p>${message}</p>`;
    return sendEmail(to, subject, text, html);
};

// Exporting the email utilities
module.exports = {
    sendEmail,
    sendWelcomeEmail,
    sendPasswordResetEmail,
    sendNotificationEmail,
};
