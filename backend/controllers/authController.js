const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const { getUserAccount, createUserAccount } = require("../db/queries");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const validateAccountCreation = [
  body("username").custom(async (value) => {
    if (await getUserAccount(value)) {
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

const login = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await getUserAccount(username);
  console.log("route works");

  try {
    if (!user) {
      return res.status(404).send("Username does not exist");
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(404).send("Incorrect password");
    }
    console.log(user);

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET
    );
    return res.status(200).json({
      token: token,
      message: "Login Successful",
      username: user.username,
    });
  } catch (err) {
    return res.status(400).send("Unknown Error");
  }
};

const getUser = (req, res) => {
  res.json({ user: req.user });
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Unauthorized");
    }
    next();
  });
};

module.exports = {
  createAccount,
  login,
  verifyToken,
  getUser,
};
