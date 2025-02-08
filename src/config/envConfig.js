// Environment variables configuration

const envConfig = {
    NODE_ENV: process.env.NODE_ENV || 'development', // Node environment (development, production, etc.)
    PORT: process.env.PORT || 3000, // Port for the application
    DB_HOST: process.env.DB_HOST || 'localhost', // Database host
    DB_PORT: process.env.DB_PORT || 27017, // Database port
    DB_NAME: process.env.DB_NAME || 'pifinance', // Database name
    DB_USER: process.env.DB_USER || '', // Database username
    DB_PASSWORD: process.env.DB_PASSWORD || '', // Database password
};

module.exports = envConfig;
