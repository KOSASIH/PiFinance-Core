const Web3 = require('web3');
const fs = require('fs');
const path = require('path');
const { abi: PiCoinABI, evm: { bytecode: PiCoinBytecode } } = require('../PiCoin.json');
const { abi: StablecoinManagerABI, evm: { bytecode: StablecoinManagerBytecode } } = require('../StablecoinManager.json');
const { abi: TransactionProcessorABI, evm: { bytecode: TransactionProcessorBytecode } } = require('../TransactionProcessor.json');

// Initialize Web3
const web3 = new Web3('http://localhost:8545'); // Replace with your Ethereum node URL

async function migrateContracts() {
    const accounts = await web3.eth.getAccounts();
    const addresses = loadContractAddresses();

    // Migrate PiCoin
    let piCoinAddress = addresses.PiCoin;
    if (!piCoinAddress) {
        const piCoin = await new web3.eth.Contract(PiCoinABI)
            .deploy({ data: PiCoinBytecode, arguments: [1000000] }) // Initial supply
            .send({ from: accounts[0], gas: 1500000, gasPrice: '30000000000' });
        piCoinAddress = piCoin.options.address;
        console.log('PiCoin deployed at:', piCoinAddress);
    } else {
        console.log('PiCoin already deployed at:', piCoinAddress);
    }

    // Migrate StablecoinManager
    let stablecoinManagerAddress = addresses.StablecoinManager;
    if (!stablecoinManagerAddress) {
        const stablecoinManager = await new web3.eth.Contract(StablecoinManagerABI)
            .deploy({ data: StablecoinManagerBytecode, arguments: [piCoinAddress, '0xOracleAddress'] }) // Replace with actual oracle address
            .send({ from: accounts[0], gas: 1500000, gasPrice: '30000000000' });
        stablecoinManagerAddress = stablecoinManager.options.address;
        console.log('StablecoinManager deployed at:', stablecoinManagerAddress);
    } else {
        console.log('StablecoinManager already deployed at:', stablecoinManagerAddress);
    }

    // Migrate TransactionProcessor
    let transactionProcessorAddress = addresses.TransactionProcessor;
    if (!transactionProcessorAddress) {
        const transactionProcessor = await new web3.eth.Contract(TransactionProcessorABI)
            .deploy({ data: TransactionProcessorBytecode, arguments: [piCoinAddress, stablecoinManagerAddress, accounts[0]] }) // Fee collector is the deployer
            .send({ from: accounts[0], gas: 1500000, gasPrice: '30000000000' });
        transactionProcessorAddress = transactionProcessor.options.address;
        console.log('TransactionProcessor deployed at:', transactionProcessorAddress);
    } else {
        console.log('TransactionProcessor already deployed at:', transactionProcessorAddress);
    }

    // Save updated contract addresses
    saveContractAddresses({
        PiCoin: piCoinAddress,
        StablecoinManager: stablecoinManagerAddress,
        TransactionProcessor: transactionProcessorAddress,
    });
}

// Function to load contract addresses from JSON file
function loadContractAddresses() {
    const filePath = path.join(__dirname, 'contractAddresses.json');
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    }
    return {};
}

// Function to save contract addresses to a JSON file
function saveContractAddresses(addresses) {
    const filePath = path.join(__dirname, 'contractAddresses.json');
    fs.writeFileSync(filePath, JSON.stringify(addresses, null, 2));
    console.log('Contract addresses saved to', filePath);
}

// Execute the migration
migrateContracts()
    .then(() => console.log('Migration successful'))
    .catch(err => console.error('Migration failed:', err));
