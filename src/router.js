const express = require("express");
const transactionsRouter = require("./endpoints/transactions/transactions.router");

const Router = express.Router();

Router.get("/", (req, res) => {
  res.send("Hello World! This is the API for Kashier's transactions.");
});

Router.use(transactionsRouter.path, transactionsRouter.router);

module.exports = Router;
