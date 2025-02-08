// src/stablecoin/priceOracle.js

const axios = require('axios');

class PriceOracle {
    constructor() {
        this.apiUrl = 'https://api.coingecko.com/api/v3/simple/price'; // Example API endpoint
    }

    // Fetch the price of a specific asset
    async getPrice(assetId, currency = 'usd') {
        try {
            const response = await axios.get(this.apiUrl, {
                params: {
                    ids: assetId,
                    vs_currencies: currency,
                },
            });
            const price = response.data[assetId][currency];
            console.log(`Price of ${assetId} in ${currency}:`, price);
            return price;
        } catch (error) {
            console.error('Error fetching price:', error);
            throw error;
        }
    }

    // Fetch prices for multiple assets
    async getPrices(assetIds, currency = 'usd') {
        try {
            const response = await axios.get(this.apiUrl, {
                params: {
                    ids: assetIds.join(','),
                    vs_currencies: currency,
                },
            });
            console.log('Prices fetched:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching prices:', error);
            throw error;
        }
    }
}

module.exports = new PriceOracle();
