var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const customLogger = require("../src/middleware/logger");
const auth = require("../src/middleware/auth");

const mongoose = require("mongoose");
const database = require("../src/config/DataBase");

mongoose
  .connect(database.db)
  .then(console.log("mongo db connected"))
  .catch((err) => console.log(err));

var indexRouter = require("../src/routes");
var usersRouter = require("../src/routes/users");
var todoRouter = require("../src/routes/todos");
var userRouter = require("../src/routes/user");

var index = express();

// view engine setup
// index.set("views", path.join(__dirname, "views"));
// index.set("view engine", "jade");

index.use(logger("dev"));
index.use(cors());
index.use(customLogger.customLogger);
index.use(express.json());
index.use(express.urlencoded({ extended: false }));
index.use(cookieParser());
index.use(express.static(path.join(__dirname, "public")));

index.use("/", indexRouter);
index.use("/users", usersRouter);
index.use("/api/user", userRouter);
index.use("/api/todos", todoRouter);


// catch 404 and forward to error handler
index.use(function (req, res, next) {
  next(createError(404));
});

// error handler
index.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = index;
