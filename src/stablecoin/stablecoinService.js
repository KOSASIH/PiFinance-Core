// src/stablecoin/stablecoinService.js

const web3 = require('../blockchain/web3');
const eventEmitter = require('../events/eventEmitter');
const EventTypes = require('../events/eventTypes');

class StablecoinService {
    constructor() {
        this.piCoinContract = web3.piCoinContract;
        this.transactionProcessorContract = web3.transactionProcessorContract;
    }

    // Mint stablecoins for a user
    async mintStablecoins(amount) {
        try {
            const from = await web3.getCurrentAccount();
            const result = await this.transactionProcessorContract.methods.processDeposit(amount).send({ from });
            console.log('Minted stablecoins:', result);
            eventEmitter.emit(EventTypes.TRANSACTION_PROCESSED, { user: from, amount, type: 'mint' });
            return result;
        } catch (error) {
            console.error('Error minting stablecoins:', error);
            throw error;
        }
    }

    // Burn stablecoins for a user
    async burnStablecoins(amount) {
        try {
            const from = await web3.getCurrentAccount();
            const result = await this.transactionProcessorContract.methods.processWithdrawal(amount).send({ from });
            console.log('Burned stablecoins:', result);
            eventEmitter.emit(EventTypes.TRANSACTION_PROCESSED, { user: from, amount, type: 'burn' });
            return result;
        } catch (error) {
            console.error('Error burning stablecoins:', error);
            throw error;
        }
    }

    // Transfer stablecoins to another user
    async transferStablecoins(to, amount) {
        try {
            const from = await web3.getCurrentAccount();
            const result = await this.transactionProcessorContract.methods.processTransfer(to, amount).send({ from });
            console.log('Transferred stablecoins:', result);
            eventEmitter.emit(EventTypes.TRANSACTION_PROCESSED, { user: from, to, amount, type: 'transfer' });
            return result;
        } catch (error) {
            console.error('Error transferring stablecoins:', error);
            throw error;
        }
    }

    // Get the balance of stablecoins for a user
    async getStablecoinBalance(address) {
        try {
            const balance = await this.piCoinContract.methods.balanceOf(address).call();
            console.log('Stablecoin balance for', address, ':', balance);
            return balance;
        } catch (error) {
            console.error('Error fetching stablecoin balance:', error);
            throw error;
        }
    }

    // Get the transaction fee
    async getTransactionFee() {
        try {
            const fee = await this.transactionProcessorContract.methods.transactionFee().call();
            console.log('Current transaction fee:', fee);
            return fee;
        } catch (error) {
            console.error('Error fetching transaction fee:', error);
            throw error;
        }
    }
}

module.exports = new StablecoinService();
