const express = require("express");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var validator = require('validator');
const router = express.Router();
const { validateEmailPass } = require('../helpers/utils');
const { makeQueue } = require('../helpers/imageQueue');
const {
  checkForUserWithEmailDb,
  createUserDb,
} = require("../db/authenticateDb");
require("dotenv").config();

router.post("/register", async (req, res) => {
  const { email, password } = req.body || "";
  if(!validateEmailPass(email, password, res)){
    return null;
  }
  const oldUser = await checkForUserWithEmailDb(email);
  try {
    if (oldUser) {
      res
        .status(409).json({
          error: true,
          msg: "User Already Exist. Please Login",
        })
    } else {
      let encryptedPassword = await bcrypt.hash(password, 10);
      let user = await createUserDb(email, encryptedPassword);
      makeQueue();
      const token = jwt.sign(
        { userId: user.id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000000000,
      });
      res.status(200).json({
        error: false,
        msg: "User created successfully",
        data: user,
      });
      
    }
  } catch (err) {}
});

router.post("/login", async (req, res) => {
  console.log(req.cookies);
  const { email, password } = req.body;
  if(!validateEmailPass(email, password, res)){
    return null;
  }
  const user = await checkForUserWithEmailDb(email);
  if (user) {
    let compare = await bcrypt.compare(password, user.password);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { userId: user.id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000000000,
      });
      res.status(200).json({
        error: false,
        msg: "User Logged in successfully",
        data: user,
      });
    } else {
      res.status(401).json({
        error: true,
        msg: "Incorrect Username or Password",
        data: null,
      });
    }
  } else {
    res.status(401).json({
      error: true,
      msg: "Incorrect Username or Password",
      data: null,
    });
  }
});

router.post('/logout', async (req, res) => {

  res.cookie("token", "", {
    httpOnly: true,
    maxAge: 1000000000,
  });
  res.status(200).json({
    error: false,
    msg: "User Logged out",
  });
})
module.exports = router;
