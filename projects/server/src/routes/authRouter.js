const authController = require("../controllers/authController");
const validatorMiddleware = require("../middleware/validatorMiddleware");
const router = require("express").Router();

router.post(
  "/register",
  validatorMiddleware.validateRegistration,
  authController.registerUser
);

module.exports = router;
