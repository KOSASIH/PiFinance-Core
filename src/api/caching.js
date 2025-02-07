const NodeCache = require('node-cache');

// Create a new cache instance
const cache = new NodeCache({
    stdTTL: 600, // Default time-to-live for cache entries in seconds (10 minutes)
    checkperiod: 120, // Period to check for expired cache entries in seconds
});

// Middleware to cache responses
const cacheMiddleware = (req, res, next) => {
    const key = req.originalUrl || req.url; // Use the request URL as the cache key
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
        // If a cached response exists, return it
        return res.status(200).json(cachedResponse);
    }

    // Store the original send method
    const originalSend = res.send.bind(res);

    // Override the send method to cache the response
    res.send = (body) => {
        // Cache the response before sending it
        cache.set(key, JSON.parse(body));
        return originalSend(body);
    };

    next();
};

// Function to clear the cache (optional)
const clearCache = (key) => {
    cache.del(key);
};

module.exports = {
    cacheMiddleware,
    clearCache,
};
