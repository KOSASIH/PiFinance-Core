const express = require('express');
const { createInvestment, getInvestmentPortfolio } = require('../controllers/investmentController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, createInvestment);
router.get('/portfolio', authenticate, getInvestmentPortfolio);

module.exports = router;
