// src/tests/testUtils.js

const { web3 } = require('./setup');

// Function to create a new account
async function createAccount() {
    const account = web3.eth.accounts.create();
    return account;
}

// Function to send Ether between accounts
async function sendEther(from, to, amount) {
    await web3.eth.sendTransaction({ from, to, value: web3.utils.toWei(amount.toString(), 'ether') });
}

// Function to reset the blockchain state (if using a local test blockchain)
async function resetBlockchain() {
    // Implementation depends on the testing framework and blockchain setup
    // For example, you might use a command to reset Ganache or Hardhat
}

module.exports = {
    createAccount,
    sendEther,
    resetBlockchain,
};
