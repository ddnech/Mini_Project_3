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

  async getAllCategory(req, res) {
    try {
      const category = await db.Category.findAll({
        attributes: ["id", "name"],
        order: [["id", "ASC"]],
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

};
