const express = require('express');
const { applyForLoan, repayLoan } = require('../controllers/loanController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/apply', authenticate, applyForLoan);
router.post('/repay', authenticate, repayLoan);

module.exports = router;
