const Web3 = require('web3');
const { abi: PiCoinABI } = require('./PiCoin.json');
const { abi: StablecoinManagerABI } = require('./StablecoinManager.json');
const { abi: TransactionProcessorABI } = require('./TransactionProcessor.json');

// Initialize Web3
const web3 = new Web3('http://localhost:8545'); // Replace with your Ethereum node URL

// Replace with deployed contract addresses
const piCoinAddress = '0xYourPiCoinAddress'; // Replace with actual deployed address
const stablecoinManagerAddress = '0xYourStablecoinManagerAddress'; // Replace with actual deployed address
const transactionProcessorAddress = '0xYourTransactionProcessorAddress'; // Replace with actual deployed address

// Create contract instances
const piCoinContract = new web3.eth.Contract(PiCoinABI, piCoinAddress);
const stablecoinManagerContract = new web3.eth.Contract(StablecoinManagerABI, stablecoinManagerAddress);
const transactionProcessorContract = new web3.eth.Contract(TransactionProcessorABI, transactionProcessorAddress);

// Listen for Minted events from PiCoin
piCoinContract.events.Minted()
    .on('data', event => {
        console.log('Minted event:', event.returnValues);
        // Additional logic can be added here, e.g., updating UI or notifying users
    })
    .on('error', console.error);

// Listen for Burned events from PiCoin
piCoinContract.events.Burned()
    .on('data', event => {
        console.log('Burned event:', event.returnValues);
        // Additional logic can be added here
    })
    .on('error', console.error);

// Listen for TransactionProcessed events from TransactionProcessor
transactionProcessorContract.events.TransactionProcessed()
    .on('data', event => {
        console.log('TransactionProcessed event:', event.returnValues);
        // Additional logic can be added here, e.g., updating transaction history
    })
    .on('error', console.error);

// Listen for CollateralDeposited events from StablecoinManager
stablecoinManagerContract.events.CollateralDeposited()
    .on('data', event => {
        console.log('CollateralDeposited event:', event.returnValues);
        // Additional logic can be added here
    })
    .on('error', console.error);

// Listen for CollateralWithdrawn events from StablecoinManager
stablecoinManagerContract.events.CollateralWithdrawn()
    .on('data', event => {
        console.log('CollateralWithdrawn event:', event.returnValues);
        // Additional logic can be added here
    })
    .on('error', console.error);

// Listen for Liquidated events from StablecoinManager
stablecoinManagerContract.events.Liquidated()
    .on('data', event => {
        console.log('Liquidated event:', event.returnValues);
        // Additional logic can be added here
    })
    .on('error', console.error);

// Function to start listening to events
function startListening() {
    console.log('Listening for events...');
}

// Start listening for events
startListening();
