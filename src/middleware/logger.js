function customLog(req, res, next) {
  req.requestTime = Date.now();
  console.log("request log ", req.url);
  next();
}

module.exports.customLogger = customLog;
