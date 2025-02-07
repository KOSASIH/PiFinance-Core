const UserService = require('../services/userService');
const { validationResult } = require('express-validator');

exports.registerUser  = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await UserService.register(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.loginUser  = async (req, res) => {
    try {
        const token = await UserService.login(req.body);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getUser Profile = async (req, res) => {
    try {
        const user = await UserService.getProfile(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
