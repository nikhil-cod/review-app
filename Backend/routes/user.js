const express = require('express');
const { createUser, verifyEmail } = require('../controllers/user');
const { userValidator,validate } = require('../middlewares/validator');
const router = express.Router();

router.post('/create',userValidator,validate,createUser);
router.post("/verify-email",verifyEmail);

module.exports = router;