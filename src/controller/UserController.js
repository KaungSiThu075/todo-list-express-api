const userServices = require("../services/UserService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { config } = require("../config/Config");

async function userRegister(req, res, next) {
  const userName = req.body.username;
  const userPassword = req.body.password;

  try {
    const user = await userServices.userRegister(userName, userPassword);
    let payload = { id: user._id };
    const token = jwt.sign(payload, config.TOKEN_SECRET);
    res.status(200).send({ token });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err.message });
  }
}

async function userLogin(req, res, next) {
  const userName = req.body.username;
  const userPassword = req.body.password;

  try {
    let user = await userServices.userLogin(userName, userPassword);
    let payload = { id: user._id };
    const token = jwt.sign(payload, config.TOKEN_SECRET);
    res.status(200).send({ token });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
}

async function getUserById(req, res, next) {
  let userId = req.params.userId;

  try {
    let user = await userServices.getUserById(userId);
    if (user) {
      return res.status(200).json(user);
    }
  } catch (err) {
    return res.status(404).send({ err: err.message });
  }
}

module.exports = { userRegister, userLogin, getUserById };
