const express = require('express');
const { createUser, verifyEmail, resendEmailVerificationToken } = require('../controllers/user');
const { userValidator,validate } = require('../middlewares/validator');
const router = express.Router();

router.post('/create',userValidator,validate,createUser);
router.post("/verify-email",verifyEmail);
router.post("/resend-email-verification-token",resendEmailVerificationToken);


module.exports = router;