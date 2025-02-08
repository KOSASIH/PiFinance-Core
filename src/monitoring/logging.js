// src/monitoring/logging.js

const winston = require('winston');

// Create a logger instance
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'application.log' }),
    ],
});

// Function to log an info message
function logInfo(message) {
    logger.info(message);
}

// Function to log an error message
function logError(message) {
    logger.error(message);
}

module.exports = {
    logInfo,
    logError,
};
