// src/utils/performanceUtils.js

const logger = require('./logger'); // Assuming you have a logger utility

class PerformanceUtils {
    constructor() {
        this.metrics = {};
    }

    // Start measuring performance for a specific operation
    startMeasurement(operationName) {
        if (!this.metrics[operationName]) {
            this.metrics[operationName] = {
                startTime: Date.now(),
                totalTime: 0,
                count: 0,
            };
        } else {
            logger.warn(`Measurement for ${operationName} already started.`);
        }
    }

    // Stop measuring performance for a specific operation
    stopMeasurement(operationName) {
        if (this.metrics[operationName]) {
            const duration = Date.now() - this.metrics[operationName].startTime;
            this.metrics[operationName].totalTime += duration;
            this.metrics[operationName].count += 1;
            this.metrics[operationName].startTime = null; // Reset start time
            logger.info(`Performance for ${operationName}: ${duration} ms`);
        } else {
            logger.warn(`No measurement found for ${operationName}.`);
        }
    }

    // Log average performance metrics for all operations
    logPerformanceMetrics() {
        logger.info('Performance Metrics:');
        for (const operation in this.metrics) {
            const { totalTime, count } = this.metrics[operation];
            const averageTime = count > 0 ? totalTime / count : 0;
            logger.info(`Operation: ${operation}, Average Time: ${averageTime.toFixed(2)} ms, Total Calls: ${count}`);
        }
    }

    // Reset all performance metrics
    resetMetrics() {
        this.metrics = {};
        logger.info('Performance metrics have been reset.');
    }
}

module.exports = new PerformanceUtils();
