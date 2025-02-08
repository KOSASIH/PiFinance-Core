const Web3 = require('web3');
const { abi: PiCoinABI } = require('./PiCoin.json');
const { abi: StablecoinManagerABI } = require('./StablecoinManager.json');
const { abi: TransactionProcessorABI } = require('./TransactionProcessor.json');

// Initialize Web3
const web3 = new Web3('http://localhost:8545'); // Replace with your Ethereum node URL

// Contract instances
const piCoinAddress = '0xYourPiCoinAddress'; // Replace with actual deployed address
const stablecoinManagerAddress = '0xYourStablecoinManagerAddress'; // Replace with actual deployed address
const transactionProcessorAddress = '0xYourTransactionProcessorAddress'; // Replace with actual deployed address

const piCoinContract = new web3.eth.Contract(PiCoinABI, piCoinAddress);
const stablecoinManagerContract = new web3.eth.Contract(StablecoinManagerABI, stablecoinManagerAddress);
const transactionProcessorContract = new web3.eth.Contract(TransactionProcessorABI, transactionProcessorAddress);

// Function to get the current account
async function getCurrentAccount() {
    const accounts = await web3.eth.getAccounts();
    return accounts[0]; // Return the first account
}

// Function to get the balance of an address
async function getBalance(address) {
    return await web3.eth.getBalance(address);
}

// Function to send a transaction
async function sendTransaction(to, value) {
    const from = await getCurrentAccount();
    return await web3.eth.sendTransaction({ from, to, value });
}

// Function to mint PiCoins
async function mintPiCoins(amount) {
    const from = await getCurrentAccount();
    return await transactionProcessorContract.methods.processDeposit(amount).send({ from });
}

// Function to burn PiCoins
async function burnPiCoins(amount) {
    const from = await getCurrentAccount();
    return await transactionProcessorContract.methods.processWithdrawal(amount).send({ from });
}

// Function to transfer PiCoins
async function transferPiCoins(to, amount) {
    const from = await getCurrentAccount();
    return await transactionProcessorContract.methods.processTransfer(to, amount).send({ from });
}

// Function to get the balance of PiCoins for a user
async function getPiCoinBalance(address) {
    return await piCoinContract.methods.balanceOf(address).call();
}

// Function to support a new token
async function supportToken(tokenAddress) {
    const from = await getCurrentAccount();
    return await transactionProcessorContract.methods.supportToken(tokenAddress).send({ from });
}

// Function to remove support for a token
async function removeTokenSupport(tokenAddress) {
    const from = await getCurrentAccount();
    return await transactionProcessorContract.methods.removeTokenSupport(tokenAddress).send({ from });
}

// Function to get the transaction fee
async function getTransactionFee() {
    return await transactionProcessorContract.methods.transactionFee().call();
}

// Exporting the Web3 instance and utility functions
module.exports = {
    web3,
    getCurrentAccount,
    getBalance,
    sendTransaction,
    mintPiCoins,
    burnPiCoins,
    transferPiCoins,
    getPiCoinBalance,
    supportToken,
    removeTokenSupport,
    getTransactionFee,
};
