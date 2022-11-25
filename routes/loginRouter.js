const express =require('express');
const router= express.Router();
const { sendOTP, verifyOTP, homeFn, logout, refreshTokens } = require('../controllers/loginController');
const { verifyToken } = require('../middleware/auth');

router.route("/getOTP").post(sendOTP); // get OTP
router.route("/verifyOTP").post(verifyOTP); // verifies OTP
router.route("/home").post(verifyToken, homeFn); // test authentication
router.route("/refresh").post(refreshTokens); //refresh tokens
router.route("/logout").get(logout); // clears token and cookie

module.exports=router;