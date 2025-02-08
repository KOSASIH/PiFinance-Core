// src/events/eventHandlers/transactionHandler.js

const eventEmitter = require('../eventEmitter');
const EventTypes = require('../eventTypes');

const transactionHandler = (eventData) => {
    console.log('Processing transaction event:', eventData);
    // Add logic to handle transaction events, e.g., updating a database or notifying users
};

// Listen for transaction processed events
eventEmitter.on(EventTypes.TRANSACTION_PROCESSED, transactionHandler);

module.exports = transactionHandler;
