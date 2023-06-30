const bcrypt = require("bcrypt");
const db = require("../models");

module.exports = {
  async registerUser(req, res) {
    const { username, storeName, email, phone, address, password } = req.body;

    try {
      const isExist = await db.User.findOne({
        where: {
          [db.Sequelize.Op.or]: [
            { username },
            { storeName },
            { email },
            { phone },
          ],
        },
      });

      if (isExist) {
        res.status(400).send({
          message:
            "username / store name / email / phone number already registered",
        });
        return;
      }

      //generate password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const newUser = await db.User.create({
        username,
        storeName,
        email,
        phone,
        address,
        password: hashPassword,
        imgProfile: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return res.status(201).send({
        message: "Registration success. Welcome!",
        data: {
          username: newUser.username,
          storeName: newUser.storeName,
          email: newUser.email,
          phone: newUser.phone,
          address: newUser.address,
        },
      });
    } catch (error) {
      res.status(500).send({
        message: "Fatal error on server",
        errors: error.message,
      });
    }
  },
};
