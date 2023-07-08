const router = require("express").Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const validatorMiddleware = require("../middleware/validatorMiddleware");
const multerMiddlewareProduct = require("../middleware/multerMiddleware/product");
const transactionController = require("../controllers/transactionController");
const multerMiddlewareProfile = require("../middleware/multerMiddleware/profile");



router.use(authMiddleware.verifyToken);

router.get("/category", userController.getUserCategory);

router.patch(
  "/category/:id",
  validatorMiddleware.updateCategory,
  userController.updateCategory
);

router.patch(
  "/product/:id",
  multerMiddlewareProduct.single("file"),
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

router.post("/income", userController.userIncome);

router.post("/checkout", transactionController.checkout);

router.post("/purchase",authMiddleware.verifyToken,userController.userPurchase)

router.get("/",authMiddleware.verifyToken,userController.getUserProfile)

router.patch("/profile",authMiddleware.verifyToken,multerMiddlewareProfile.single("file"),userController.updateImageProfile)

module.exports = router;
