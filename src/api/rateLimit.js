const rateLimit = require('express-rate-limit');

// Create a rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        status: 429,
        error: 'Too many requests, please try again later.',
    },
    headers: true, // Send rate limit info in the `RateLimit-*` headers
});

// Apply the rate limiter to all requests
const applyRateLimit = (app) => {
    app.use(limiter);
};

module.exports = {
    limiter,
    applyRateLimit,
};
