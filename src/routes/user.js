const express = require("express");
const router = express.Router();
const user = require("../controller/UserController");

router.get("/:userId", user.getUserById);
router.post("/register", user.userRegister);
router.post("/login", user.userLogin);

module.exports = router;
