const User = require("../models/User");
const bcrypt = require("bcrypt");

async function userRegister(username, password) {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  let user = new User({
    username: username,
    password: hashPassword,
  });
  return user.save();
}

async function userLogin(username, password) {
  const filter = { username: username };

  let user = await User.findOne(filter);

  if (user) {
    const validPassTest = await bcrypt.compare(password, user.password);
    if (validPassTest) {
      return user;
    } else {
      throw new Error("invalid password");
    }
  } else {
    throw new Error("invalid, register first");
  }
}

async function getUserById(userId) {
  let user = await User.findById(userId);
  if (user) {
    return user;
  } else {
    throw new Error(`can't find user`);
  }
}

async function getAllUsers() {
  let users = await User.find();
  if (users.length) {
    return users;
  } else {
    return [];
  }
}

module.exports = { userRegister, userLogin, getUserById, getAllUsers };
