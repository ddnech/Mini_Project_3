const productController = require("../controllers/productController");
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

router.post(
  "/",
  authMiddleware.verifyToken,
  multerMiddleware.single("file"),
  validatorMiddleware.validateProduct,
  productController.createProduct
);

router.patch(
  "/:id",
  authMiddleware.verifyToken,
  multerMiddleware.single("file"),
  productController.updateProduct
);

router.get(
  "/",
  productController.getAllProduct
  );


module.exports = router;
