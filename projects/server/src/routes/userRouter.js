const router = require("express").Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const validatorMiddleware = require("../middleware/validatorMiddleware");

router.get(
  "/category",
  authMiddleware.verifyToken,
  productController.getUserCategory
);

router.patch(
  "/category/:id",
  authMiddleware.verifyToken,
  validatorMiddleware.updateCategory,
  productController.updateCategory
);

module.exports = router;
