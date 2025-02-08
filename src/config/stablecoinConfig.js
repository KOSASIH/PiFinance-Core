// Configuration for stablecoin mechanisms

const stablecoinConfig = {
    targetValue: process.env.STABLECOIN_TARGET_VALUE || 314159.00, // Target value of the stablecoin in USD
    totalSupply: process.env.STABLECOIN_TOTAL_SUPPLY || 100_000_000_000, // Total supply of the stablecoin
    collateralRatio: process.env.STABLECOIN_COLLATERAL_RATIO || 1.5, // Collateralization ratio
    reserveAssets: process.env.STABLECOIN_RESERVE_ASSETS 
        ? process.env.STABLECOIN_RESERVE_ASSETS.split(',') 
        : [
            'USD',      // US Dollar
            'BTC',      // Bitcoin
            'ETH',      // Ethereum
            'USDT',     // Tether (US Dollar-pegged stablecoin)
            'BNB',      // Binance Coin
            'XRP',      // Ripple
            'LTC',      // Litecoin
            'ADA',      // Cardano
            'SOL',      // Solana
            'DOT',      // Polkadot
            'JPY',      // Japanese Yen
            'EUR',      // Euro
            'GBP',      // British Pound
            'CHF',      // Swiss Franc
            'AUD',      // Australian Dollar
            'GOLD',     // Gold (precious metal)
            'SILVER',   // Silver (precious metal)
            'PLATINUM', // Platinum (precious metal)
            'PALLADIUM',// Palladium (precious metal)
            'OIL',      // Crude Oil (commodity)
            'NATURAL_GAS', // Natural Gas (commodity)
            'COPPER',   // Copper (industrial metal)
            'WHEAT',    // Wheat (agricultural commodity)
            'CORN',     // Corn (agricultural commodity)
            'COFFEE',   // Coffee (agricultural commodity)
            'SUGAR',    // Sugar (agricultural commodity)
            'REAL_ESTATE', // Real Estate (investment asset)
            'ART',      // Art (alternative investment)
            'NFT',      // Non-Fungible Tokens (digital assets)
        ], // List of reserve assets
    transactionFee: process.env.STABLECOIN_TRANSACTION_FEE || 0.005, // Transaction fee for the stablecoin
};

module.exports = stablecoinConfig;
