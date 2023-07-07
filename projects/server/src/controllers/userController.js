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

  async userIncome(req, res) {
    try {
        const startDate = new Date(req.body.start);
        const endDate = new Date(req.body.end);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({
                message: 'Invalid start or end date provided',
            });
        }

      const maxDateRange = 7;
      const dateDifference = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

      if (dateDifference > maxDateRange) {
      return res.status(400).json({
      message: 'The date range cannot exceed 7 days.',
      });
      }

        endDate.setDate(endDate.getDate() + 1);

        const products = await db.Product.findAll({
            where: { seller_id: req.user.id },
            attributes: ['id', 'price'], //{[1,100],[2,200]}
        });

        const productIds = products.map(product => product.id); //[1,2]
        let totalIncome = 0;
        let dailyIncome = {};

        for (let i = 0; i < productIds.length; i++) {
            const productId = productIds[i]; 
            const productPrice = products[i].price;

            // Find each order item with createdAt date, grouped by date
            const orderItems = await db.Order_item.findAll({
                where: {
                    product_id: productId,
                    createdAt: {
                        [db.Sequelize.Op.between]: [startDate, endDate]
                    }
                },
                attributes: [
                    [db.Sequelize.fn('date', db.Sequelize.col('createdAt')), 'date'],
                    [db.Sequelize.fn('count', '*'), 'count']
                ],
                group: [db.Sequelize.fn('date', db.Sequelize.col('createdAt'))]
            });

            for (let item of orderItems) {
                const date = item.getDataValue('date');
                const count = item.getDataValue('count');
                if (!dailyIncome[date]) {
                    dailyIncome[date] = 0;
                }

                const income = productPrice * count;
                dailyIncome[date] += income;
                totalIncome += income;
            }
        }

        res.status(200).json({
            message: 'Total and daily incomes calculated successfully',
            totalIncome: totalIncome,
            dailyIncome: dailyIncome
        });
    } catch (error) {
        console.error('Failed to calculate total and daily incomes:', error);
        res.status(500).json({
            message: 'Failed to calculate total and daily incomes',
            error: error.message
        });
    }
  },

  async userPurchase(req, res){
    try{
      const buyer_id = req.user.id;

      const order_detail = await db.Order_detail.findOne({
        where: { buyer_id },
      });
      
      if (!order_detail) {
        return res.status(404).json({ message: 'Order detail not found' });
      }
      
      const order_items = await db.Order_item.findAll({
        where: { orderDetail_id: order_detail.id },
      });
      
      if (!order_items) {
        return res.status(404).json({ message: 'Order items not found' });
      }

      const productIds = order_items.map(order_item => order_item.product_id);

      const products = await db.Product.findAndCountAll({
        where: { id: productIds },
        attributes: ['id', 'createdAt'],
        include: [
          {
            model: db.Order_item,
            attributes: [
              [db.Sequelize.fn('COUNT', 'product_id'), 'count'],
            ],
          },
        ],
        group: ['id', 'createdAt'],
      });
      
      if (!products) {
        return res.status(404).json({ message: 'Products not found' });
      }
      
      res.status(200).json({
        message: 'Product details retrieved successfully',
        products: products,
      });
  
    } catch (error) {
      console.error('Failed to get user purchases:', error);
      res.status(500).json({
          message: 'Failed to get user purchases',
          error: error.message
      });
    }
  }
  
  

  
};
