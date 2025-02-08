// src/tests/setup.js

const Web3 = require('web3');
const { abi: PiCoinABI, evm: { bytecode: PiCoinBytecode } } = require('../blockchain/PiCoin.json');
const { abi: StablecoinManagerABI, evm: { bytecode: StablecoinManagerBytecode } } = require('../blockchain/StablecoinManager.json');
const { abi: TransactionProcessorABI, evm: { bytecode: TransactionProcessorBytecode } } = require('../blockchain/TransactionProcessor.json');

const web3 = new Web3('http://localhost:8545'); // Replace with your test blockchain URL

async function deployContracts() {
    const accounts = await web3.eth.getAccounts();

    const piCoin = await new web3.eth.Contract(PiCoinABI)
        .deploy({ data: PiCoinBytecode, arguments: [1000000] }) // Initial supply
        .send({ from: accounts[0], gas: 1500000 });

    const stablecoinManager = await new web3.eth.Contract(StablecoinManagerABI)
        .deploy({ data: StablecoinManagerBytecode, arguments: [piCoin.options.address, '0xOracleAddress'] }) // Replace with actual oracle address
        .send({ from: accounts[0], gas: 1500000 });

    const transactionProcessor = await new web3.eth.Contract(TransactionProcessorABI)
        .deploy({ data: TransactionProcessorBytecode, arguments: [piCoin.options.address, stablecoinManager.options.address, accounts[0]] }) // Fee collector is the deployer
        .send({ from: accounts[0], gas: 1500000 });

    return {
        piCoin: piCoin.options.address,
        stablecoinManager: stablecoinManager.options.address,
        transactionProcessor: transactionProcessor.options.address,
    };
}

module.exports = {
    web3,
    deployContracts,
};
