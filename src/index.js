// src/index.js

const express = require('express');
const bodyParser = require('body-parser');
const metrics = require('./monitoring/metrics');
const logging = require('./monitoring/logging');
const healthCheck = require('./monitoring/healthCheck');
const stablecoinService = require('./stablecoin/stablecoinService');
const liquidityManager = require('./stablecoin/liquidityManager');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Health check endpoint
app.get('/health', async (req, res) => {
    const healthResults = await healthCheck.performHealthChecks([
        { name: 'Stablecoin Service', url: `http://localhost:${PORT}/health` },
        // Add other services as needed
    ]);
    res.json({ status: 'UP', health: healthResults });
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', metrics.register.contentType);
    res.end(await metrics.getMetrics());
});

// Example endpoint for minting stablecoins
app.post('/mint', async (req, res) => {
    const { amount } = req.body;
    try {
        const result = await stablecoinService.mintStablecoins(amount);
        logging.logInfo(`Minted ${amount} stablecoins.`);
        res.status(200).json(result);
    } catch (error) {
        logging.logError(`Error minting stablecoins: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

// Example endpoint for adding liquidity
app.post('/liquidity/add', async (req, res) => {
    const { asset, amount } = req.body;
    try {
        await liquidityManager.addLiquidity(asset, amount);
        logging.logInfo(`Added ${amount} of ${asset} to liquidity.`);
        res.status(200).json({ message: 'Liquidity added successfully.' });
    } catch (error) {
        logging.logError(`Error adding liquidity: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
