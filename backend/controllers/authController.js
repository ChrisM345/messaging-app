const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const { doesUserExist, createUserAccount } = require("../db/queries");
const jwt = require("jsonwebtoken");

const validateAccountCreation = [
  body("username").custom(async (value) => {
    if (await doesUserExist(value)) {
      throw new Error("Username already in use");
    }
  }),
];

const createAccount = [
  validateAccountCreation,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(401).send(errors.array()[0].msg);
    }
    try {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          throw new Error("Error encrypting password");
        }
        createUserAccount(req.body.username, hashedPassword);
        return res.status(201).send("Account created");
      });
    } catch (err) {
      return res.status(500).send("Error creating user");
    }
  },
];

module.exports = {
  createAccount,
};
