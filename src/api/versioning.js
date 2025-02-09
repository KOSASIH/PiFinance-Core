// src/api/versioning.js

const express = require('express');
const logger = require('../utils/logger'); // Assuming you have a logger utility

const router = express.Router();

// Middleware to handle API versioning
const versioningMiddleware = (req, res, next) => {
    // Extract version from request headers or URL
    const version = req.headers['accept-version'] || req.params.version || 'v1'; // Default to v1 if not specified

    // Log the requested version
    logger.info(`Requested API version: ${version}`);

    // Check if the requested version is supported
    const supportedVersions = ['v1', 'v2', 'v3']; // List of supported versions
    if (!supportedVersions.includes(version)) {
        return res.status(400).json({
            error: 'Unsupported API version. Supported versions are: ' + supportedVersions.join(', ')
        });
    }

    // Attach the version to the request object for further processing
    req.apiVersion = version;
    next();
};

// Example route for user-related operations
router.get('/users/:version?', versioningMiddleware, (req, res) => {
    const version = req.apiVersion;

    // Route to the appropriate controller based on the version
    switch (version) {
        case 'v1':
            return require('./controllers/v1/userController').getUsers(req, res);
        case 'v2':
            return require('./controllers/v2/userController').getUsers(req, res);
        case 'v3':
            return require('./controllers/v3/userController').getUsers(req, res);
        default:
            return res.status(404).json({ error: 'Not Found' });
    }
});

// Example route for savings account operations
router.get('/savings/:version?', versioningMiddleware, (req, res) => {
    const version = req.apiVersion;

    switch (version) {
        case 'v1':
            return require('./controllers/v1/savingsController').getSavingsAccounts(req, res);
        case 'v2':
            return require('./controllers/v2/savingsController').getSavingsAccounts(req, res);
        case 'v3':
            return require('./controllers/v3/savingsController').getSavingsAccounts(req, res);
        default:
            return res.status(404).json({ error: 'Not Found' });
    }
});

// Add more routes as needed...

module.exports = router;
