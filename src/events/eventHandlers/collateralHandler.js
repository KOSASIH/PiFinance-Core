// src/events/eventHandlers/collateralHandler.js

const eventEmitter = require('../eventEmitter');
const EventTypes = require('../eventTypes');

const collateralHandler = (eventData) => {
    console.log('Processing collateral event:', eventData);
    // Add logic to handle collateral events, e.g., updating a database or notifying users
};

// Listen for collateral deposited and withdrawn events
eventEmitter.on(EventTypes.COLLATERAL_DEPOSITED, collateralHandler);
eventEmitter.on(EventTypes.COLLATERAL_WITHDRAWN, collateralHandler);

module.exports = collateralHandler;
