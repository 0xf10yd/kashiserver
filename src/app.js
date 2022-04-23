const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./router");
const errorHandler = require("./common/errorMiddleware");
const expressPinoLogger = require("express-pino-logger");
const logger = require("./services/loggerService");

app.use(bodyParser.json());
app.use(router);
app.use(errorHandler);

const loggerMidlleware = expressPinoLogger({
  logger: logger,
  autoLogging: true,
});

app.use(loggerMidlleware);

module.exports = app;
