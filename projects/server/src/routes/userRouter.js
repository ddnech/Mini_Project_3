const router = require("express").Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const validatorMiddleware = require("../middleware/validatorMiddleware");
const multerMiddleware = require("../middleware/multerMiddleware/product");

router.get(
  "/category",
  authMiddleware.verifyToken,
  userController.getUserCategory
);

router.patch(
  "/category/:id",
  authMiddleware.verifyToken,
  validatorMiddleware.updateCategory,
  userController.updateCategory
);

router.patch(
  "/product/:id",
  authMiddleware.verifyToken,
  multerMiddleware.single("file"),
  userController.updateProduct
);

router.get(
  "/product",
  authMiddleware.verifyToken,
  userController.getAllUserProduct
);


module.exports = router;
