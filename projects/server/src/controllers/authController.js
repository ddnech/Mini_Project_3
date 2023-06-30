const jwt = require('jsonwebtoken');
const db = require('../models');
// const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
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
    const passwordMatch = (password === user.password);

    if (passwordMatch) {
  
      const token = generateJWTToken(user); 
      res.json({ message: 'Login successful', token, data: user.id });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
} catch (error) {
  console.error('Error during login:', error);
  res.status(500).json({ error: 'Internal server error' });
}
};

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
  loginUser,
}; 