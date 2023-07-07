const router = require("express").Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const validatorMiddleware = require("../middleware/validatorMiddleware");
const multerMiddleware = require("../middleware/multerMiddleware/product");
const transactionController = require("../controllers/transactionController");

router.use(authMiddleware.verifyToken);

router.get("/category", userController.getUserCategory);

router.patch(
  "/category/:id",
  validatorMiddleware.updateCategory,
  userController.updateCategory
);

router.patch(
  "/product/:id",
  multerMiddleware.single("file"),
  userController.updateProduct
);

router.get("/product", userController.getAllUserProduct);

router.get("/cart", transactionController.getCart);

router.post(
  "/cart/:id",
  validatorMiddleware.addToCart,
  transactionController.addToCart
);

router.delete("/cart", transactionController.emptyCart);

router.delete("/cart/:id", transactionController.removeFromCart);

router.get("/income", userController.userIncome);

router.post("/checkout", transactionController.checkout);

module.exports = router;
