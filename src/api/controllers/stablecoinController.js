const StablecoinService = require('../services/stablecoinService');

exports.mintStablecoin = async (req, res) => {
    try {
        const stablecoin = await StablecoinService.mint(req.user.id, req.body.amount);
        res.status(201).json(stablecoin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.redeemStablecoin = async (req, res) => {
    try {
        const result = await StablecoinService.redeem(req.user.id, req.body.amount);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getStablecoinBalance = async (req, res) => {
    try {
        const balance = await StablecoinService.getBalance(req.user.id);
        res.status(200).json(balance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
