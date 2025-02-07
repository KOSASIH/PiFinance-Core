const winston = require('winston');

// Create a logger instance
const logger = winston.createLogger({
    level: 'info', // Default logging level
    format: winston.format.combine(
        winston.format.timestamp(), // Add timestamp to logs
        winston.format.json() // Log in JSON format
    ),
    transports: [
        new winston.transports.Console(), // Log to console
        new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log error messages to a file
        new winston.transports.File({ filename: 'combined.log' }) // Log all messages to a file
    ],
});

// Export the logger instance
module.exports = logger;
