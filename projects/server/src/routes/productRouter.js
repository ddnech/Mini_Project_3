const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const multerMiddleware = require("../middleware/multerMiddleware/product");
const router = require("express").Router();

router.post(
  "/",
  authMiddleware.verifyToken,
  multerMiddleware.single("file"),
  productController.createProduct,
);

router.patch(
  "/:id",
  authMiddleware.verifyToken,
  multerMiddleware.single("file"),
  productController.updateProduct,
);

module.exports = router;