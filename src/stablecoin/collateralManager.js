// src/stablecoin/collateralManager.js

const web3 = require('../blockchain/web3');
const eventEmitter = require('../events/eventEmitter');
const EventTypes = require('../events/eventTypes');

class CollateralManager {
    constructor() {
        this.stablecoinManagerContract = web3.stablecoinManagerContract;
    }

    // Deposit collateral (Ether)
    async depositCollateral(amount) {
        try {
            const from = await web3.getCurrentAccount();
            const result = await this.stablecoinManagerContract.methods.depositCollateral().send({ from, value: amount });
            console.log('Collateral deposited:', result);
            eventEmitter.emit(EventTypes.COLLATERAL_DEPOSITED, { user: from, amount });
            return result;
        } catch (error) {
            console.error('Error depositing collateral:', error);
            throw error;
        }
    }

    // Withdraw collateral (Ether)
    async withdrawCollateral(amount) {
        try {
            const from = await web3.getCurrentAccount();
            const result = await this.stablecoinManagerContract.methods.withdrawCollateral(amount).send({ from });
            console.log('Collateral withdrawn:', result);
            eventEmitter.emit(EventTypes.COLLATERAL_WITHDRAWN, { user: from, amount });
            return result;
        } catch (error) {
            console.error('Error withdrawing collateral:', error);
            throw error;
        }
    }

    // Check if a user is collateralized
    async isCollateralized(user) {
        try {
            const collateralValue = await this.stablecoinManagerContract.methods.collateralBalances(user).call();
            const stablecoinValue = await this.stablecoinManagerContract.methods.getStablecoinValue(user).call(); // Assuming this method exists
            const collateralizationRatio = collateralValue / stablecoinValue; // Example calculation
            console.log('Collateralization ratio for', user, ':', collateralizationRatio);
            return collateralizationRatio >= 1.5; // Example threshold
        } catch (error) {
            console.error('Error checking collateralization:', error);
            throw error;
        }
    }

    // Liquidate a user if under-collateralized
    async liquidate(user) {
        try {
            const from = await web3.getCurrentAccount();
            const result = await this.stablecoinManagerContract.methods.liquidate(user).send({ from });
            console.log('User  liquidated:', result);
            eventEmitter.emit(EventTypes.LIQUIDATED, { user });
            return result;
        } catch (error) {
            console.error('Error liquidating user:', error);
            throw error;
        }
    }
}

module.exports = new CollateralManager();
