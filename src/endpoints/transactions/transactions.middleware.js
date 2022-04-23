const { isNull } = require("../../common/utils");

const validCurrencies = ["USD", "EGP", "EUR"];

const extractMerchantId = async (req, res, next) => {
  let merchantid = req.params["merchantid"];
  if (merchantid) {
    res.locals.merchantid = merchantid;
    return next();
  } else {
    return next({
      statusCode: 401,
      message: "",
    });
  }
};

const extractTransaction = (transaction) => {
  let amount = transaction["amount"];
  let currency = transaction["currency"];
  let pay = transaction["pay"];
  let missing =
    isNull(amount) || isNull(currency) || isNaN(amount) || isNull(pay);
  let invalidpay = typeof pay !== "boolean";
  let invalidCurrency = validCurrencies.includes(currency) == false;
  let invalid = missing || invalidpay || invalidCurrency;
  if (invalid) {
    return null;
  }
  let result = {
    amount: amount,
    currency: currency,
    pay: pay,
  };
  return result;
};

const validateTransaction = (req, res, next) => {
  let transaction = extractTransaction(req.body);
  if (isNull(transaction)) {
    return next({ statusCode: 422 });
  }
  res.locals.validatedTransaction = transaction;
  return next();
};

const validateTransactionsBulk = (req, res, next) => {
  let array = [];
  req.body.forEach((transaction) => {
    let toPush = extractTransaction(transaction);
    if (isNull(toPush)) {
      return next({ statusCode: 422 });
    }
    array.push(toPush);
  });
  if (array.length == 0) {
    return next({ statusCode: 422 });
  }
  res.locals.validatedTransactionsArray = array;
  return next();
};

module.exports = {
  extractMerchantId,
  validateTransaction,
  validateTransactionsBulk,
};
