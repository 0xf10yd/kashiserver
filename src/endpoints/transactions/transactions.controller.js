const utils = require("../../common/utils");
const transactionsService = require("../../services/transactions/mongo.service");

const extractMerchantId = (res) => res.locals.merchantid;

const getTransactions = utils.catchAsync(async (req, res) => {
  let merchantid = extractMerchantId(res);
  let results = await transactionsService.getTransactions(merchantid);
  res.status(200).send(results);
});

const deleteTransactions = utils.catchAsync(async (req, res) => {
  let merchantid = extractMerchantId(res);
  await transactionsService.deleteTransactions(merchantid);
  res.status(200).send(`All transactions deleted for merchant ${merchantid} has been deleted!`);
});

const deleteSingleTransaction = utils.catchAsync(async (req, res) => {
  let transactionid = req.params.transactionid;
  await transactionsService.deleteSingleTransaction(transactionid);
  res.status(200).send(`Transaction deleted with id ${transactionid}!`);
});

const addSingleTransaction = utils.catchAsync(async (req, res) => {
  let merchantid = extractMerchantId(res);
  let transaction = res.locals.validatedTransaction;
  await transactionsService.addSingleTransaction(merchantid, transaction);
  res.status(201).send();
});

const addBulkTransactions = utils.catchAsync(async (req, res) => {
  let merchantid = extractMerchantId(res);
  let transactions = res.locals.validatedTransactionsArray;
  await transactionsService.addBulkTransactions(merchantid, transactions);
  res.status(201).send();
});

module.exports = {
  getTransactions,
  addSingleTransaction,
  addBulkTransactions,
  deleteTransactions,
  deleteSingleTransaction
};
