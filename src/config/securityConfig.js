// Security settings configuration

const securityConfig = {
    cors: {
        origin: process.env.CORS_ORIGIN || '*', // Allowed origins for CORS
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    },
    rateLimiting: {
        windowMs: process.env.RATE_LIMIT_WINDOW || 15 * 60 * 1000, // 15 minutes
        max: process.env.RATE_LIMIT_MAX || 100, // Limit each IP to 100 requests per windowMs
    },
};

module.exports = securityConfig;
