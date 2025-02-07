// API configuration settings

const apiConfig = {
    baseUrl: process.env.API_BASE_URL || 'https://api.pifinance.com', // Base URL for the API
    timeout: process.env.API_TIMEOUT || 5000, // Timeout for API requests in milliseconds
    version: process.env.API_VERSION || 'v1', // API version
};

module.exports = apiConfig;
