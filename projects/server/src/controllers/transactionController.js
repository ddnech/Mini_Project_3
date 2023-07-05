const db = require("../models");

module.exports = {
  async addToCart(req, res) {
    const productId = req.params.id;
    const quantity = Number(req.body.quantity);

    try {
      const user = await db.User.findByPk(req.user.id);
      if (!user) {
        return res.status(401).send({ message: "User Unauthorized" });
      }
      // Check if the product exists
      const product = await db.Product.findByPk(productId);
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }

      // Add the product to the user's cart
      await user.addProduct(product, { through: { quantity } });

      res.send({ message: "Product added to cart successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
};
