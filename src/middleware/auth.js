const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { config } = require("../config/Config");

function verifyUserToken(req, res, next) {
  let token = req.headers.authorization;

  if (!token) {
    // res.redirect("/");
    return res.status(401).send("access denied/ unauthorized");
  }

  try {
    token = token.split(" ")[1];
    if (token === null || !token) {
      return res.status(401).send("access denied/ unauthorized");
    }
    let verifiedUser = jwt.verify(token, config.TOKEN_SECRET);
    if (!verifiedUser) {
      return res.status(401).send("unauthorized request");
    }
    req.user = verifiedUser;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send("invalid token");
  }
}

module.exports = { verifyUserToken };
