const merchantsTransactions = {};

const addSingleTransaction = async (merchantid, transaction) => {
  let existing = await getTransactions(merchantid);
  existing.push(transaction);
  await setTransactions(merchantid, existing);
};

const addBulkTransactions = async (merchantid, transactions) => {
  let existing = await getTransactions(merchantid);
  transactions.forEach((t) => {
    existing.push(t);
  });
  await setTransactions(merchantid, existing);
};

const setTransactions = async (merchantid, transactions) => {
  merchantsTransactions[merchantid] = transactions;
};

const getTransactions = async (merchantid) => {
  let results = merchantsTransactions[merchantid];
  if (results === null || results === undefined) {
    return [];
  }
  return results;
};

module.exports = {
  addSingleTransaction,
  getTransactions,
  addBulkTransactions,
};
