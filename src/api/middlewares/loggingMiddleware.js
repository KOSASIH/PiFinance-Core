const logger = require('../utils/logger');

exports.logRequest = (req, res, next) => {
    const { method, url, headers } = req;
    logger.info(`Request: ${method} ${url}`, { headers });
    next();
};
