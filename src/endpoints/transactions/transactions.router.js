const express = require("express");
const router = express.Router();
const {
  getTransactions,
  addSingleTransaction,
  addBulkTransactions,
  deleteTransactions,
} = require("./transactions.controller");
const {
  extractMerchantId,
  validateTransaction,
  validateTransactionsBulk,
} = require("./transactions.middleware");

router
  .route("/:merchantid")
  .get(extractMerchantId, getTransactions)
  .post(validateTransaction, extractMerchantId, addSingleTransaction)
  .patch(validateTransactionsBulk, extractMerchantId, addBulkTransactions)
  .delete(extractMerchantId, deleteTransactions);

module.exports = {
  router: router,
  path: "/transactions",
};
