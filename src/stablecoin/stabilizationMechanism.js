const priceOracle = require('./priceOracle');
const stablecoinManager = require('./stablecoinService');
const logger = require('../utils/logger'); // Assuming you have a logger utility
const { PI_COIN } = require('../constants'); // Importing constants

class StabilizationMechanism {
    constructor() {
        this.targetPrice = PI_COIN.VALUE; // Target price for the stablecoin ($314,159.00)
        this.priceThreshold = PI_COIN.STABILITY_THRESHOLD; // Price deviation threshold (5%)
    }

    // Check the current price of the stablecoin
    async checkCurrentPrice() {
        try {
            const currentPrice = await priceOracle.getPrice(PI_COIN.SYMBOL); // Use the symbol from constants
            logger.info('Current stablecoin price:', currentPrice);
            return currentPrice;
        } catch (error) {
            logger.error('Error fetching current price:', error);
            throw new Error('Price fetch failed');
        }
    }

    // Adjust supply based on price deviation
    async adjustSupply() {
        try {
            const currentPrice = await this.checkCurrentPrice();
            const priceDeviation = Math.abs(currentPrice - this.targetPrice);

            if (priceDeviation > this.priceThreshold) {
                if (currentPrice < this.targetPrice) {
                    // Price is below target, mint more stablecoins
                    const amountToMint = this.calculateMintAmount(priceDeviation);
                    logger.info(`Minting ${amountToMint} stablecoins to stabilize price.`);
                    await stablecoinManager.mintStablecoins(amountToMint);
                } else {
                    // Price is above target, burn stablecoins
                    const amountToBurn = this.calculateBurnAmount(priceDeviation);
                    logger.info(`Burning ${amountToBurn} stablecoins to stabilize price.`);
                    await stablecoinManager.burnStablecoins(amountToBurn);
                }
            } else {
                logger.info('Stablecoin price is within acceptable range. No action needed.');
            }
        } catch (error) {
            logger.error('Error adjusting supply:', error);
        }
    }

    // Calculate the amount to mint based on price deviation
    calculateMintAmount(deviation) {
        return Math.floor(deviation * 1000); // Adjust the multiplier as needed
    }

    // Calculate the amount to burn based on price deviation
    calculateBurnAmount(deviation) {
        return Math.floor(deviation * 1000); // Adjust the multiplier as needed
    }

    // Run the stabilization mechanism
    async run() {
        logger.info('Running stabilization mechanism...');
        await this.adjustSupply();
    }
}

module.exports = new StabilizationMechanism();
