const db = require("../models");
const {
  setFromFileNameToDBValueProduct,
  getAbsolutePathPublicFileProduct,
  getFileNameFromDbValue,
} = require("../helper");
const fs = require("fs");

module.exports = {
  async getAllUserProduct(req, res) {
    const pagination = {
      page: Number(req.query.page) || 1,
      perPage: 9,
      search: req.query.search || undefined,
      category: req.query.category || undefined,
      sortAlphabet: req.query.sortAlphabet,
      sortPrice: req.query.sortPrice,
    };

    try {
      const where = {};
      const order = [];

      if (req.user.id) {
        where.seller_id = req.user.id;
      }

      if (pagination.search) {
        where.name = {
          [db.Sequelize.Op.like]: `%${pagination.search}%`,
        };
      }

      if (pagination.category) {
        where.category_id = pagination.category;
      }
      if(pagination.sortAlphabet){
        if (pagination.sortAlphabet.toUpperCase() === "DESC") {
          order.push(["name", "DESC"]);
        } else {
          order.push(["name", "ASC"]);
        }
      }

      if(pagination.sortPrice){
        if (pagination.sortPrice.toUpperCase() === "DESC") {
          order.push(["price", "DESC"]);
        } else {
          order.push(["price", "ASC"]);
        }
      }


      const results = await db.Product.findAndCountAll({
        where,
        include: [
          {
            model: db.Category,
          },
        ],
        limit: pagination.perPage,
        offset: (pagination.page - 1) * pagination.perPage,
        order,
      });

      const totalCount = results.count;
      pagination.totalData = totalCount;

      if (results.rows.length === 0) {
        return res.status(200).send({
          message: "No products found",
        });
      }

      res.send({
        message: "Successfully retrieved products",
        pagination,
        data: results.rows.map((product) => {
          return {
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            imgProduct: product.imgProduct,
            stock: product.stock,
            isActive: product.isActive,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            category: {
              id: product.Category.id,
              name: product.Category.name,
            },
          };
        }),
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
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
        return res.status(404).send({ message: "Category not found" });
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

  async userIncome(req, res){
    try {
        let startDate = new Date(req.query.start);
        let endDate = new Date(req.query.end);

        const endDateExpected = new Date(startDate);
        endDateExpected.setDate(endDateExpected.getDate() + 7);

        if (endDate.getTime() !== endDateExpected.getTime()) {
            throw new Error("End date should be exactly 7 days after start date");
        }

        const sellerProducts = await db.Product.findAll({ 
            where: { seller_id:req.user.id },  
        });

        const productIds = sellerProducts.map(product => product.id);

        let totalIncome = 0;

        for (const id of productIds) {
            const product = await db.Product.findOne({ where: { id }});
            const orderItemsCount = await db.Order_item.count({ 
                where: { 
                    product_id: id,
                    createdAt: {
                        [Op.between]: [startDate, endDate]
                    }
                }, 
            });
            totalIncome += product.price * orderItemsCount;
        }

        res.status(200).json({
            message: 'Total income calculated successfully',
            totalIncome: totalIncome
        });

    } catch (error) {
        console.error('Failed to calculate total income:', error);
        res.status(500).json({
            message: 'Failed to calculate total income',
            error: error.message
        });
    }
}

  
};
