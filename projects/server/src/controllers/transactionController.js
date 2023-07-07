const db = require("../models");

module.exports = {
  async addToCart(req, res) {
    const productId = req.params.id;
    const quantity = Number(req.body.quantity);

    try {
      const user = await db.User.findByPk(req.user.id);
      if (!user) {
        return res.status(401).send({ message: "User not found" });
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

  async removeFromCart(req, res) {
    const productId = req.params.id;

    try {
      const user = await db.User.findByPk(req.user.id);
      if (!user) {
        return res.status(401).send({ message: "User not found" });
      }
      // Check if the product exists
      const product = await db.Product.findByPk(productId);
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }

      await user.removeProduct(product);
      res.send({ message: "Product removed from cart successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  async emptyCart(req, res) {
    const productId = req.params.id;

    try {
      const user = await db.User.findByPk(req.user.id);
      if (!user) {
        return res.status(401).send({ message: "User not found" });
      }

      // Get all products in the user's cart
      const products = await user.getProducts();

      if (products.length === 0) {
        return res.status(404).send({ message: "Cart is already empty" });
      }

      // Remove all products from the user's cart
      await user.removeProducts(products);
      res.send({ message: "All product removed from cart successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  async getCart(req, res) {
    try {
      const user = await db.User.findByPk(req.user.id);
      if (!user) {
        return res.status(401).send({ message: "User not found" });
      }

      const cart = await db.Cart.findAll({
        where: { buyer_id: user.id },
        include: [
          {
            model: db.Product,
            include: [
              {
                model: db.Category,
              },
            ],
          },
        ],
      });

      const cartDetails = cart.map((cartItem) => ({
        product: {
          id: cartItem.Product.id,
          name: cartItem.Product.name,
          price: cartItem.Product.price,
          description: cartItem.Product.description,
          imgProduct: cartItem.Product.imgProduct,
          stock: cartItem.Product.stock,
          isActive: cartItem.Product.isActive,
          createdAt: cartItem.Product.createdAt,
          updatedAt: cartItem.Product.updatedAt,
          category: {
            id: cartItem.Product.Category.id,
            name: cartItem.Product.Category.name,
          },
        },
        quantity: cartItem.quantity,
      }));

      res.status(201).send({
        message: "Cart retrieved successfully",
        data: cartDetails,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  async checkout(req, res) {
    const transaction = await db.sequelize.transaction();
    try {
      const user = await db.User.findByPk(req.user.id, { transaction });
      if (!user) {
        return res.status(401).send({ message: "User not found" });
      }

      const cart = await db.Cart.findAll({
        where: {
          buyer_id: req.user.id,
        },
        include: [
          {
            model: db.Product,
            attributes: ["price"],
          },
        ],
        transaction,
      });

      if (!cart) {
        return res.status(400).send({ message: "Cart is empty" });
      }

      let totalPrice = 0;
      const orderItems = [];

      cart.forEach((item) => {
        const quantity = item.quantity;
        const price = item.Product.price;
        totalPrice += quantity * price;

        for (let i = 0; i < quantity; i++) {
          orderItems.push({
            orderDetail_id: null,
            product_id: item.product_id,
          });
        }
      });

      const orderDetail = await db.Order_detail.create(
        {
          buyer_id: req.user.id,
          totalPrice,
          address: req.body.address,
        },
        { transaction }
      );

      await Promise.all(
        orderItems.map((orderItem) => {
          orderItem.orderDetail_id = orderDetail.id;
          return db.Order_item.create(orderItem, { transaction });
        })
      );

      await db.Cart.destroy({
        where: {
          buyer_id: req.user.id,
        },
        transaction,
      });

      await transaction.commit();

      res.status(201).send({ message: "Successfully created order details" });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
};
