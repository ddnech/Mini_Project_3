const productController = require("../controllers/productController");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const multerMiddleware = require("../middleware/multerMiddleware/product");
const validatorMiddleware = require("../middleware/validatorMiddleware");
const router = require("express").Router();

router.get("/category", productController.getAllCategory);

router.post(
  "/category",
  authMiddleware.verifyToken,
  validatorMiddleware.createCategory,
  productController.createCategory
);

router.get("/category", productController.getAllCategory);

router.post(
  "/",
  authMiddleware.verifyToken,
  multerMiddleware.single("file"),
  validatorMiddleware.validateProduct,
  productController.createProduct
);

router.get("/", productController.getAllProduct);

router.get("/:id", productController.getProductById);

module.exports = router;
