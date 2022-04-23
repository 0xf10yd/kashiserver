const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (statusCode === undefined) {
    statusCode = 500;
  }
  res.status(statusCode).send(message);
};

module.exports = errorHandler;
