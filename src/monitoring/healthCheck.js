// src/monitoring/healthCheck.js

const axios = require('axios');

// Function to check the health of a service
async function checkServiceHealth(url) {
    try {
        const response = await axios.get(url);
        return response.status === 200;
    } catch (error) {
        console.error(`Health check failed for ${url}:`, error.message);
        return false;
    }
}

// Function to perform health checks on multiple services
async function performHealthChecks(services) {
    const results = {};
    for (const service of services) {
        results[service.name] = await checkServiceHealth(service.url);
    }
    return results;
}

module.exports = {
    checkServiceHealth,
    performHealthChecks,
};
