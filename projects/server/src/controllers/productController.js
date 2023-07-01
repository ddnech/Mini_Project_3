const db = require("../models");
const {
  setFromFileNameToDBValueProduct,
  getAbsolutePathPublicFileProduct,
  getFileNameFromDbValue,
} = require("../helper");
const fs = require("fs");

module.exports = {
  async createProduct(req, res) {
    try {
      const { name, price, category_id, description, stock } = req.body;
      let imgProduct = "";

      if (req.file) {
        imgProduct = setFromFileNameToDBValueProduct(req.file.filename);
      }

      const products = await db.Product.create({
        seller_id: req.user.id,
        name,
        price,
        category_id,
        description,
        imgProduct,
        stock,
      });
      console.log(products);

      return res.status(201).send(products);
    } catch (error) {
      res.status(500).send({
        message: "Fatal error on server",
        errors: error.message,
      });
    }
  },

  async updateProduct(req, res) {
    try {
      const { name, price, category_id, description, stock } = req.body;

      const updatedProduct = await db.Product.findOne({
        where: {
          id: parseInt(req.params.id),
          seller_id: req.user.id,
        },
      });

      if (!updatedProduct) {
        return res.status(400).send({
          message: "Product not found",
        });
      }

      if (req.file) {
        const realimgProduct = updatedProduct.getDataValue("imgProduct"); //   /public/IMG-16871930921482142001.jpeg
        const oldFilename = getFileNameFromDbValue(realimgProduct); //   IMG-16871930921482142001.jpeg
        if (oldFilename) {
          fs.unlinkSync(getAbsolutePathPublicFileProduct(oldFilename));
        }
        updatedProduct.imgProduct = setFromFileNameToDBValueProduct(
          req.file.filename
        );
      }

      if (category_id !== undefined) {
        updatedProduct.category_id =
          parseInt(category_id) !== ""
            ? parseInt(category_id)
            : updatedProduct.category_id;
      }

      if (name) {
        updatedProduct.name = name;
      }
      if (price) {
        updatedProduct.price = parseInt(price);
      }
      if (description) {
        updatedProduct.description = description;
      }
      if (stock) {
        updatedProduct.stock = parseInt(stock);
      }

      await updatedProduct.save();
      return res.status(200).send(updatedProduct);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },

  async getAllCategory(req, res) {
    try {
      const category = await db.Category.findAll({
        attributes: ["id", "name"],
      });

      return res
        .status(200)
        .send({ message: "Successfully get all categories", data: category });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },

  async getUserCategory(req, res) {
    const user_id = req.user.id;
    try {
      const category = await db.Category.findAll({
        where: {
          user_id,
        },
        attributes: ["id", "name"],
      });

      return res
        .status(200)
        .send({ message: "Successfully get user categories", data: category });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },

  async createCategory(req, res) {
    const user_id = req.user.id;
    try {
      const { name } = req.body;

      await db.Category.create({
        user_id,
        name,
      });

      return res
        .status(201)
        .send({ message: "Successfully created new category" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },

  async updateCategory(req, res) {
    const user_id = req.user.id;
    try {
      const { name } = req.body;

      const getCategory = await db.Category.findOne({
        where: {
          id: req.params.id,
          user_id,
        },
      });

      if (!getCategory) {
        return res.status(401).send({ message: "Category not found" });
      }

      if (name) {
        getCategory.name = name;
      }

      await getCategory.save();
      return res.status(201).send({
        message: "Successfully updated the category",
        data: getCategory,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },
};
