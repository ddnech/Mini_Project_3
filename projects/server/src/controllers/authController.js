const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

const generateJWTToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET_KEY
  );
  return token;
};

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

  async loginUser(req, res) {
    try {
      const { identifier, password } = req.body;

      const user = await db.User.findOne({
        where: {
          [db.Sequelize.Op.or]: [
            { username: identifier },
            { phone: identifier },
            { email: identifier },
          ],
        },
      });

      if (user) {
        // const passwordMatch = await bcrypt.compare(password, user.password);
        const passwordMatch = password === user.password;

        if (passwordMatch) {
          const token = generateJWTToken(user);
          res.json({ message: "Login successful", token, data: user.id });
        } else {
          res.status(401).json({ error: "Invalid credentials" });
        }
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
