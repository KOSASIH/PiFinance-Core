// Configuration for stablecoin mechanisms

const stablecoinConfig = {
    targetValue: process.env.STABLECOIN_TARGET_VALUE || 314159.00, // Target value of the stablecoin in USD
    totalSupply: process.env.STABLECOIN_TOTAL_SUPPLY || 100_000_000_000, // Total supply of the stablecoin
    collateralRatio: process.env.STABLECOIN_COLLATERAL_RATIO || 1.5, // Collateralization ratio
    reserveAssets: process.env.STABLECOIN_RESERVE_ASSETS ? process.env.STABLECOIN_RESERVE_ASSETS.split(',') : ['USD', 'BTC', 'ETH'], // List of reserve assets
    transactionFee: process.env.STABLECOIN_TRANSACTION_FEE || 0.005, // Transaction fee for the stablecoin
};

module.exports = stablecoinConfig;
