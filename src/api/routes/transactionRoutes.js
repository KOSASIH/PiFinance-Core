const express = require('express');
const { getTransactionHistory } = require('../controllers/transactionController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/history', authenticate, getTransactionHistory);

module.exports = router;
