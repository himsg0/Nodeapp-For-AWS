const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require('../utils/Multer');


// Create user
router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/signup", userController.Signup);
router.post("/login", userController.Login);
router.post("/upload",upload.single("file"), userController.profileUpload);
router.get("/user", userController.getUser);
router.put("/user", userController.updateUser);
router.put("/user/like", userController.likeShop);
router.put("/user/unlike", userController.unlikeShop);

router.put("/coin/credit/user", userController.creditCoin);
router.put("/coin/debit/user", userController.debitCoin);

module.exports = router;