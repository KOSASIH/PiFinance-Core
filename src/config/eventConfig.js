// Event-driven architecture configuration

const eventConfig = {
    eventBusUrl: process.env.EVENT_BUS_URL || 'http://localhost:4000', // URL for the event bus
    eventQueueName: process.env.EVENT_QUEUE_NAME || 'pifinance_events', // Name of the event queue
    retryAttempts: process.env.RETRY_ATTEMPTS || 5, // Number of retry attempts for event processing
    retryDelay: process.env.RETRY_DELAY || 2000, // Delay between retry attempts in milliseconds
};

module.exports = eventConfig;
