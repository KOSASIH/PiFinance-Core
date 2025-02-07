const cors = require('cors');

exports.corsMiddleware = cors({
    origin: '*', // Allow all origins (adjust as needed)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});
