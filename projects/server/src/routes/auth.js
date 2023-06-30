const { auth: authController } = require("../controllers");
const router = require("express").Router();

router.post("/login",authController.loginUser);

module.exports = router;
