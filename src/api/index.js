const express = require('express');
const mongoose = require('mongoose');
const { applyRateLimit } = require('./rateLimit');
const { setupSwagger } = require('./swagger');
const { cacheMiddleware } = require('./caching');
const { errorHandler } = require('./middlewares/errorHandler');
const userRoutes = require('./routes/userRoutes');
const savingsRoutes = require('./routes/savingsRoutes');
const loanRoutes = require('./routes/loanRoutes');
const investmentRoutes = require('./routes/investmentRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const stablecoinRoutes = require('./routes/stablecoinRoutes');
const logger = require('./utils/logger');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => logger.info('MongoDB connected successfully'))
.catch(err => logger.error('MongoDB connection error:', err));

// Middleware setup
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
applyRateLimit(app); // Apply rate limiting middleware
setupSwagger(app); // Set up Swagger documentation
app.use(cacheMiddleware); // Apply caching middleware

// Route definitions
app.use('/api/users', userRoutes);
app.use('/api/savings', savingsRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/stablecoin', stablecoinRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
