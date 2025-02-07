// Utility functions for data validation

// Function to validate email addresses
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    return emailRegex.test(email);
};

// Function to validate usernames
const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Alphanumeric and underscores, 3-20 characters
    return usernameRegex.test(username);
};

// Function to validate passwords
const validatePassword = (password) => {
    // At least 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

// Function to validate transaction amounts
const validateTransactionAmount = (amount) => {
    return typeof amount === 'number' && amount > 0; // Must be a positive number
};

// Function to validate that a value is a non-empty string
const validateNonEmptyString = (value) => {
    return typeof value === 'string' && value.trim().length > 0; // Must be a non-empty string
};

// Function to validate that an object has required properties
const validateObjectProperties = (obj, requiredProps) => {
    return requiredProps.every(prop => obj.hasOwnProperty(prop) && validateNonEmptyString(obj[prop]));
};

// Function to validate that a value is a valid URL
const validateUrl = (url) => {
    const urlRegex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/i; // Basic URL regex
    return urlRegex.test(url);
};

// Exporting the validation utilities
module.exports = {
    validateEmail,
    validateUsername,
    validatePassword,
    validateTransactionAmount,
    validateNonEmptyString,
    validateObjectProperties,
    validateUrl,
};
