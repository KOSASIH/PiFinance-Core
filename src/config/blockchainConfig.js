// src/config/blockchainConfig.js

const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const blockchainConfig = {
    // The URL of the blockchain provider (e.g., Infura, Alchemy, or local node)
    providerUrl: process.env.BLOCKCHAIN_PROVIDER_URL || 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',

    // Addresses of deployed smart contracts
    stableCoinAddress: process.env.STABLE_COIN_ADDRESS || '0xYourStableCoinContractAddress',
    governanceAddress: process.env.GOVERNANCE_ADDRESS || '0xYourGovernanceContractAddress',
    collateralManagerAddress: process.env.COLLATERAL_MANAGER_ADDRESS || '0xYourCollateralManagerContractAddress',
    priceOracleAddress: process.env.PRICE_ORACLE_ADDRESS || '0xYourPriceOracleContractAddress',

    // Optional: Gas settings
    gasPrice: process.env.GAS_PRICE || '20000000000', // Default gas price in Wei (20 Gwei)
    gasLimit: process.env.GAS_LIMIT || '3000000', // Default gas limit for transactions

    // Optional: Network settings
    networkId: process.env.NETWORK_ID || '1', // Mainnet ID
    chainId: process.env.CHAIN_ID || '1', // Mainnet Chain ID

    // Optional: Other settings
    enableLogging: process.env.ENABLE_LOGGING === 'true', // Enable or disable logging
};

module.exports = blockchainConfig;
