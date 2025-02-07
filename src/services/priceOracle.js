const axios = require('axios');
const logger = require('../utils/logger'); // Custom logger for logging events

// Define a class for the Price Oracle
class PriceOracle {
    constructor() {
        this.apiUrl = 'https://api.coingecko.com/api/v3/simple/price'; // Example API for fetching prices
    }

    // Fetch the price of a specific asset
    async fetchPrice(assetId) {
        try {
            const response = await axios.get(this.apiUrl, {
                params: {
                    ids: assetId,
                    vs_currencies: 'usd', // You can change this to other currencies as needed
                },
            });

            if (response.data[assetId]) {
                const price = response.data[assetId].usd; // Extract the price in USD
                logger.info(`Fetched price for ${assetId}: $${price}`);
                return price;
            } else {
                throw new Error(`Price for asset ${assetId} not found`);
            }
        } catch (error) {
            logger.error('Error fetching price:', error);
            throw error;
        }
    }

    // Fetch prices for multiple assets
    async fetchPrices(assetIds) {
        try {
            const response = await axios.get(this.apiUrl, {
                params: {
                    ids: assetIds.join(','),
                    vs_currencies: 'usd',
                },
            });

            const prices = {};
            assetIds.forEach(assetId => {
                if (response.data[assetId]) {
                    prices[assetId] = response.data[assetId].usd;
                } else {
                    logger.warn(`Price for asset ${assetId} not found`);
                }
            });

            logger.info(`Fetched prices for assets: ${JSON.stringify(prices)}`);
            return prices;
        } catch (error) {
            logger.error('Error fetching prices:', error);
            throw error;
        }
    }
}

// Exporting an instance of the Price Oracle
const priceOracle = new PriceOracle();
module.exports = priceOracle;
