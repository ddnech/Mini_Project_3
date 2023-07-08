const { body, validationResult } = require("express-validator");
const db = require("../../models");

const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res
      .status(400)
      .send({ message: "An error occurs", errors: errors.array() });
  };
};

// helper
const checkUsernameUnique = async (value, { req }) => {
  try {
    const user = await db.User.findOne({ where: { username: value } });
    if (user) {
      throw new Error("Username already taken");
    }
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

const checkStoreNameUnique = async (value, { req }) => {
  try {
    const user = await db.User.findOne({ where: { storeName: value } });
    if (user) {
      throw new Error("Store name already taken");
    }
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

const checkEmailUnique = async (value, { req }) => {
  try {
    const user = await db.User.findOne({ where: { email: value } });
    if (user) {
      throw new Error("Email already taken");
    }
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

const checkPhoneUnique = async (value, { req }) => {
  try {
    const user = await db.User.findOne({ where: { phone: value } });
    if (user) {
      throw new Error("Phone number already taken");
    }
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  validateRegistration: validate([
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ max: 50 })
      .withMessage("Maximum character is 50")
      .custom(checkUsernameUnique),
    body("storeName")
      .trim()
      .notEmpty()
      .withMessage("Store name is required")
      .isLength({ max: 50 })
      .withMessage("Maximum character is 50")
      .custom(checkStoreNameUnique),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter with email format")
      .custom(checkEmailUnique),
    body("phone")
      .notEmpty()
      .withMessage("Phone is required")
      .isMobilePhone()
      .withMessage("Invalid phone number")
      .custom(checkPhoneUnique),
    body("address").notEmpty().withMessage("Address is required"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
      })
      .withMessage(
        "Password required minimal 8 characters, 1 uppercase, 1 symbol, and 1 number"
      )
      .custom((value, { req }) => {
        if (value !== req.body.confirmPassword) {
          throw new Error("Confirm password does not match with password");
        }
        return true;
      }),
    body("confirmPassword")
      .notEmpty()
      .withMessage("Confirm password is required")
      .isLength({ min: 8 })
      .withMessage("Minimum password length is 8 characters"),
  ]),

  validateProduct: validate([
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Product name is required")
      .isLength({ max: 50 })
      .withMessage("Maximum character is 50"),
    body("price")
      .trim()
      .notEmpty()
      .withMessage("Price is required")
      .isNumeric(),
    body("category_id").notEmpty().withMessage("Category is required"),
    body("description")
      .notEmpty()
      .withMessage("Description is required")
      .isLength({ max: 255 })
      .withMessage("Maximum character is 255"),
    body("stock").notEmpty().withMessage("Stock is required"),
  ]),

  updateProduct: validate([
    body("name")
      .optional()
      .trim()
      .isLength({ max: 50 })
      .withMessage("Maximum character is 50"),
    body("price").optional().trim().isNumeric(),
    body("category_id"),
    body("description")
      .optional()
      .isLength({ max: 255 })
      .withMessage("Maximum character is 255"),
    ,
    body("stock").optional(),
  ]),

  validateLogin: validate([
    body("username").notEmpty().withMessage("Username is required"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Minimum password length is 8 characters"),
  ]),

  createCategory: validate([
    body("name")
      .notEmpty()
      .withMessage("Category name is required")
      .custom(async (value, { req }) => {
        try {
          const category = await db.Category.findOne({
            where: { name: value },
          });
          if (category) {
            throw new Error("Category name already exist");
          }
          return true;
        } catch (error) {
          throw new Error(error.message);
        }
      }),
  ]),

  updateCategory: validate([
    body("name")
      .notEmpty()
      .withMessage("Category name is required")
      .custom(async (value, { req }) => {
        try {
          const category = await db.Category.findOne({
            where: { name: value },
          });
          if (category) {
            throw new Error("Category name already exist");
          }
          return true;
        } catch (error) {
          throw new Error(error.message);
        }
      }),
  ]),

  addToCart: validate([
    body("quantity")
      .notEmpty()
      .withMessage("quantity is required")
      .isInt({ min: 1 })
      .withMessage("Quantity must be a positive integer"),
  ]),

  checkoutAddress: validate([
    body("address").notEmpty().withMessage("Address is required"),
  ]),
};
