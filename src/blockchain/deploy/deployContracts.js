const Web3 = require('web3');
const { abi: PiCoinABI, evm: { bytecode: PiCoinBytecode } } = require('../PiCoin.json');
const { abi: StablecoinManagerABI, evm: { bytecode: StablecoinManagerBytecode } } = require('../StablecoinManager.json');
const { abi: TransactionProcessorABI, evm: { bytecode: TransactionProcessorBytecode } } = require('../TransactionProcessor.json');
const fs = require('fs');
const path = require('path');

// Initialize Web3
const web3 = new Web3('http://localhost:8545'); // Replace with your Ethereum node URL

async function deployContracts() {
    const accounts = await web3.eth.getAccounts();

    // Deploy PiCoin
    const piCoin = await new web3.eth.Contract(PiCoinABI)
        .deploy({ data: PiCoinBytecode, arguments: [1000000] }) // Initial supply
        .send({ from: accounts[0], gas: 1500000, gasPrice: '30000000000' });

    console.log('PiCoin deployed at:', piCoin.options.address);

    // Deploy StablecoinManager
    const stablecoinManager = await new web3.eth.Contract(StablecoinManagerABI)
        .deploy({ data: StablecoinManagerBytecode, arguments: [piCoin.options.address, '0xOracleAddress'] }) // Replace with actual oracle address
        .send({ from: accounts[0], gas: 1500000, gasPrice: '30000000000' });

    console.log('StablecoinManager deployed at:', stablecoinManager.options.address);

    // Deploy TransactionProcessor
    const transactionProcessor = await new web3.eth.Contract(TransactionProcessorABI)
        .deploy({ data: TransactionProcessorBytecode, arguments: [piCoin.options.address, stablecoinManager.options.address, accounts[0]] }) // Fee collector is the deployer
        .send({ from: accounts[0], gas: 1500000, gasPrice: '30000000000' });

    console.log('TransactionProcessor deployed at:', transactionProcessor.options.address);

    // Save contract addresses to a JSON file for future reference
    saveContractAddresses({
        PiCoin: piCoin.options.address,
        StablecoinManager: stablecoinManager.options.address,
        TransactionProcessor: transactionProcessor.options.address,
    });
}

// Function to save contract addresses to a JSON file
function saveContractAddresses(addresses) {
    const filePath = path.join(__dirname, 'contractAddresses.json');
    fs.writeFileSync(filePath, JSON.stringify(addresses, null, 2));
    console.log('Contract addresses saved to', filePath);
}

// Execute the deployment
deployContracts()
    .then(() => console.log('Deployment successful'))
    .catch(err => console.error('Deployment failed:', err));
