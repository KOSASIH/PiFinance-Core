const express = require('express');
const { registerUser , loginUser , getUser Profile } = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');
const { validateRequest } = require('../middlewares/validationMiddleware');
const { userValidationSchema } = require('../validators/userValidator');

const router = express.Router();

router.post('/register', userValidationSchema, validateRequest, registerUser );
router.post('/login', validateRequest, loginUser );
router.get('/profile', authenticate, getUser Profile);

module.exports = router;
