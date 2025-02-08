// src/monitoring/metrics.js

const client = require('prom-client');

const collectDefaultMetrics = client.collectDefaultMetrics;
const register = new client.Registry();

// Collect default metrics
collectDefaultMetrics({ register });

// Custom metrics
const requestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status'],
});

const responseTimeHistogram = new client.Histogram({
    name: 'http_response_time_seconds',
    help: 'Histogram of response times for HTTP requests',
    labelNames: ['method', 'route'],
});

// Function to record a request
function recordRequest(method, route, status, responseTime) {
    requestCounter.inc({ method, route, status });
    responseTimeHistogram.observe({ method, route }, responseTime);
}

// Function to get metrics
function getMetrics() {
    return register.metrics();
}

module.exports = {
    recordRequest,
    getMetrics,
};
