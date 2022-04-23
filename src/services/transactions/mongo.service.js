const { mongoDb } = require("../../common/mongoProvider");
const utils = require("../../common/utils");
const myCollection = mongoDb.collection("transactions");
const merchantsCol = mongoDb.collection("merchants");	

const buildTransaction = (merchantid, transaction) => {
  return {
    merchant_id: merchantid,
    timestamp: utils.today(),
    ...transaction,
  };
};

const addSingleTransaction = async (merchantid, transaction) => {
  await myCollection.insertOne(buildTransaction(merchantid, transaction));
};

const addBulkTransactions = async (merchantid, transactions) => {
  let finalTransactions = transactions.map((transaction) =>
    buildTransaction(merchantid, transaction)
  );
  await myCollection.insertMany(finalTransactions);
};

const getTransactions = async (merchantid) => {
  let today = utils.today();
  let transactions = await myCollection
    .find({
      merchant_id: merchantid,
      timestamp: today,
    })
    .toArray();
  let BalanceState = generateBalanceState(transactions);
  return {
    date: today,
    balance: BalanceState,
    transactions: transactions,
  };
};

const deleteTransactions = async (merchantid) => {
  await myCollection.deleteMany({
    merchant_id: merchantid,
  });
};

const deleteSingleTransaction = async (transactionid) => {
  await myCollection.deleteOne({
    _id: transactionid,
  });
};

const generateBalanceState = (transactions) => {
  let result = {};
  transactions.forEach((transaction) => {
    let currency = transaction.currency;
    let details = result[currency];
    if (details === null || details === undefined) {
      details = {
        credited: 0,
        debited: 0,
        net: 0,
      };
    }
    if (transaction.pay === true) {
      details.credited += transaction.amount;
    } else {
      details.debited += transaction.amount;
    }
    details.net = details.credited - details.debited;
    result[currency] = details;
  });
  return result;
};


module.exports = {
  addSingleTransaction,
  getTransactions,
  addBulkTransactions,
  deleteTransactions,
  deleteSingleTransaction
};
