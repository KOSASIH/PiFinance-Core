const logger = require('./logger'); // Import the logger utility

// Centralized error handling middleware
const errorHandler = (err, req, res, next) => {
    // Log the error details
    logger.error({
        message: err.message,
        stack: err.stack,
        status: err.status || 500, // Default to 500 if no status is provided
        path: req.originalUrl, // Log the request path
    });

    // Set the response status and send the error message
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
};

module.exports = errorHandler;
