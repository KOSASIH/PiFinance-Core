// Database configuration settings

const dbConfig = {
    host: process.env.DB_HOST || 'localhost', // Database host
    port: process.env.DB_PORT || 27017, // Database port (default for MongoDB)
    database: process.env.DB_NAME || 'pifinance', // Database name
    user: process.env.DB_USER || '', // Database username (if applicable)
    password: process.env.DB_PASSWORD || '', // Database password (if applicable)
    options: {
        useNewUrlParser: true, // Use the new URL parser
        useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
        useCreateIndex: true, // Use createIndex instead of ensureIndex
        useFindAndModify: false, // Use native findOneAndUpdate()
        // Additional options can be added here
    },
};

// Exporting the database configuration
module.exports = dbConfig;
