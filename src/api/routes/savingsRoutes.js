const express = require('express');
const { createSavingsAccount, deposit, withdraw } = require('../controllers/savingsController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, createSavingsAccount);
router.post('/deposit', authenticate, deposit);
router.post('/withdraw', authenticate, withdraw);

module.exports = router;
