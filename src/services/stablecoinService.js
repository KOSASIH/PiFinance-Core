const Stablecoin = require('../models/Stablecoin'); // Assuming you have a Stablecoin model
const User = require('../models/User');
const logger = require('../utils/logger'); // Custom logger for logging events

// Mint new stablecoins for a user
const mintStablecoins = async (userId, amount) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User  not found');
        }

        const stablecoin = await Stablecoin.findOne({ userId });
        if (!stablecoin) {
            throw new Error('Stablecoin account not found for user');
        }

        stablecoin.balance += amount; // Increase the user's stablecoin balance
        await stablecoin.save();
        logger.info(`Minted ${amount} stablecoins for user: ${userId}. New balance: ${stablecoin.balance}`);
        return stablecoin.balance;
    } catch (error) {
        logger.error('Error minting stablecoins:', error);
        throw error;
    }
};

// Redeem stablecoins for a user
const redeemStablecoins = async (userId, amount) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User  not found');
        }

        const stablecoin = await Stablecoin.findOne({ userId });
        if (!stablecoin) {
            throw new Error('Stablecoin account not found for user');
        }

        if (stablecoin.balance < amount) {
            throw new Error('Insufficient stablecoin balance');
        }

        stablecoin.balance -= amount; // Decrease the user's stablecoin balance
        await stablecoin.save();
        logger.info(`Redeemed ${amount} stablecoins for user: ${userId}. New balance: ${stablecoin.balance}`);
        return stablecoin.balance;
    } catch (error) {
        logger.error('Error redeeming stablecoins:', error);
        throw error;
    }
};

// Transfer stablecoins between users
const transferStablecoins = async (fromUser Id, toUser Id, amount) => {
    try {
        const fromUser  = await User.findById(fromUser Id);
        const toUser  = await User.findById(toUser Id);
        if (!fromUser  || !toUser ) {
            throw new Error('One or both users not found');
        }

        const fromStablecoin = await Stablecoin.findOne({ userId: fromUser Id });
        const toStablecoin = await Stablecoin.findOne({ userId: toUser Id });
        if (!fromStablecoin || !toStablecoin) {
            throw new Error('Stablecoin account not found for one or both users');
        }

        if (fromStablecoin.balance < amount) {
            throw new Error('Insufficient stablecoin balance for transfer');
        }

        // Perform the transfer
        fromStablecoin.balance -= amount;
        toStablecoin.balance += amount;
        await fromStablecoin.save();
        await toStablecoin.save();

        logger.info(`Transferred ${amount} stablecoins from user: ${fromUser Id} to user: ${toUser Id}`);
        return {
            fromBalance: fromStablecoin.balance,
            toBalance: toStablecoin.balance,
        };
    } catch (error) {
        logger.error('Error transferring stablecoins:', error);
        throw error;
    }
};

// Get stablecoin balance for a user
const getStablecoinBalance = async (userId) => {
    try {
        const stablecoin = await Stablecoin.findOne({ userId });
        if (!stablecoin) {
            throw new Error('Stablecoin account not found for user');
        }
        logger.info(`Stablecoin balance retrieved for user: ${userId}, Balance: ${stablecoin.balance}`);
        return stablecoin.balance;
    } catch (error) {
        logger.error('Error fetching stablecoin balance:', error);
        throw error;
    }
};

// Exporting stablecoin-related services
module.exports = {
    mintStablecoins,
    redeemStablecoins,
    transferStablecoins,
    getStablecoinBalance,
};
