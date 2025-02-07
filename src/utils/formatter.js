// Utility functions for data formatting

// Function to format currency values
const formatCurrency = (amount, currencySymbol = '$') => {
    return `${currencySymbol}${parseFloat(amount).toFixed(2)}`; // Format to two decimal places
};

// Function to format a date to a readable string
const formatDate = (date, options = {}) => {
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
    };
    return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(new Date(date));
};

// Function to format a number with commas as thousands separators
const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas for thousands
};

// Function to format a percentage value
const formatPercentage = (value) => {
    return `${parseFloat(value).toFixed(2)}%`; // Format to two decimal places with a percentage sign
};

// Function to format a JSON object as a pretty string
const formatJson = (jsonObject) => {
    return JSON.stringify(jsonObject, null, 2); // Pretty print JSON with 2-space indentation
};

// Function to truncate a string to a specified length
const truncateString = (str, length) => {
    if (str.length > length) {
        return str.substring(0, length) + '...'; // Truncate and add ellipsis
    }
    return str; // Return original string if it's within the length
};

// Exporting the formatting utilities
module.exports = {
    formatCurrency,
    formatDate,
    formatNumber,
    formatPercentage,
    formatJson,
    truncateString,
};
