// src/services/blockchainService.js

const Web3 = require('web3');
const { abi: stableCoinAbi } = require('../blockchain/contracts/StableCoin.json'); // Import ABI for the StableCoin contract
const { abi: governanceAbi } = require('../blockchain/contracts/Governance.json'); // Import ABI for the Governance contract
const config = require('../config/envConfig'); // Configuration file for environment variables

class BlockchainService {
    constructor() {
        // Initialize Web3 instance
        this.web3 = new Web3(new Web3.providers.HttpProvider(config.blockchainProviderUrl));
        this.stableCoinContract = new this.web3.eth.Contract(stableCoinAbi, config.stableCoinAddress);
        this.governanceContract = new this.web3.eth.Contract(governanceAbi, config.governanceAddress);
    }

    // Get the balance of a specific address
    async getBalance(address) {
        try {
            const balance = await this.stableCoinContract.methods.balanceOf(address).call();
            return this.web3.utils.fromWei(balance, 'ether'); // Convert from Wei to Ether
        } catch (error) {
            throw new Error('Error fetching balance: ' + error.message);
        }
    }

    // Send stablecoins to another address
    async sendStableCoins(fromAddress, toAddress, amount, privateKey) {
        try {
            const amountInWei = this.web3.utils.toWei(amount.toString(), 'ether'); // Convert to Wei
            const gasPrice = await this.web3.eth.getGasPrice();
            const gasLimit = await this.stableCoinContract.methods.transfer(toAddress, amountInWei).estimateGas({ from: fromAddress });

            const tx = {
                from: fromAddress,
                to: config.stableCoinAddress,
                gas: gasLimit,
                gasPrice: gasPrice,
                data: this.stableCoinContract.methods.transfer(toAddress, amountInWei).encodeABI(),
            };

            // Sign the transaction
            const signedTx = await this.web3.eth.accounts.signTransaction(tx, privateKey);
            // Send the transaction
            const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            return receipt;
        } catch (error) {
            throw new Error('Error sending stablecoins: ' + error.message);
        }
    }

    // Interact with governance contract to create a proposal
    async createProposal(description, fromAddress, privateKey) {
        try {
            const gasPrice = await this.web3.eth.getGasPrice();
            const gasLimit = await this.governanceContract.methods.createProposal(description).estimateGas({ from: fromAddress });

            const tx = {
                from: fromAddress,
                to: config.governanceAddress,
                gas: gasLimit,
                gasPrice: gasPrice,
                data: this.governanceContract.methods.createProposal(description).encodeABI(),
            };

            // Sign the transaction
            const signedTx = await this.web3.eth.accounts.signTransaction(tx, privateKey);
            // Send the transaction
            const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            return receipt;
        } catch (error) {
            throw new Error('Error creating proposal: ' + error.message);
        }
    }

    // Fetch the current price of the stablecoin from the price oracle
    async getCurrentPrice(asset) {
        try {
            const price = await this.priceOracleContract.methods.getPrice(asset).call();
            return this.web3.utils.fromWei(price, 'ether'); // Convert from Wei to Ether
        } catch (error) {
            throw new Error('Error fetching current price: ' + error.message);
        }
    }
}

module.exports = new BlockchainService();
