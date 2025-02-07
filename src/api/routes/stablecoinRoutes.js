const express = require('express');
const { mintStablecoin, redeemStablecoin, getStablecoinBalance } = require('../controllers/stablecoinController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/mint', authenticate, mintStablecoin);
router.post('/redeem', authenticate, redeemStablecoin);
router.get('/balance', authenticate, getStablecoinBalance);

module.exports = router;
