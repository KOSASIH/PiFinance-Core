const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ValidationError } = require('joi'); // Assuming Joi is used for validation
const logger = require('../utils/logger'); // Custom logger for logging events

// User registration service
const registerUser  = async (userData) => {
    try {
        const existingUser  = await User.findOne({ email: userData.email });
        if (existingUser ) {
            throw new ValidationError('Email already in use');
        }

        const newUser  = new User(userData);
        await newUser .save();
        logger.info(`User  registered: ${newUser .username}`);
        return newUser ;
    } catch (error) {
        logger.error('Error registering user:', error);
        throw error;
    }
};

// User login service
const loginUser  = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new ValidationError('Invalid email or password');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new ValidationError('Invalid email or password');
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        logger.info(`User  logged in: ${user.username}`);
        return { user, token };
    } catch (error) {
        logger.error('Error logging in user:', error);
        throw error;
    }
};

// Get user profile service
const getUser Profile = async (userId) => {
    try {
        const user = await User.findById(userId).select('-password'); // Exclude password from the result
        if (!user) {
            throw new Error('User  not found');
        }
        return user;
    } catch (error) {
        logger.error('Error fetching user profile:', error);
        throw error;
    }
};

// Update user profile service
const updateUser Profile = async (userId, updateData) => {
    try {
        const updatedUser  = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
        if (!updatedUser ) {
            throw new Error('User  not found');
        }
        logger.info(`User  profile updated: ${updatedUser .username}`);
        return updatedUser ;
    } catch (error) {
        logger.error('Error updating user profile:', error);
        throw error;
    }
};

// Exporting user-related services
module.exports = {
    registerUser ,
    loginUser ,
    getUser Profile,
    updateUser Profile,
};
