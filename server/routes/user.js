const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("../models/Users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
  const { fullName, username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (user) {
    return res.status(401).json({ message: "username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    fullName,
    username,
    password: hashedPassword,
  });
  newUser.save();
  res.json({ message: "User registered successfully" });
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "user does not exist" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (isPasswordValid) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token, userId: user._id });
  } else {
    return res.status(400).json({ message: "incorrect username or password" });
  }
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  //  console.log(token);
  if (token) {
    const isVerified = jwt.verify(token, process.env.JWT_SECRET);
    if (isVerified) {
      req.id = isVerified.id;
      next();
    } else {
      return res.status(400).json({ message: "unauthorized to access" });
    }
  }
};
module.exports = { router, verifyToken };
