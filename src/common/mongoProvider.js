const { MongoClient } = require("mongodb");
const { databaseConnectionString, databaseName } = require("../config");

const mongoClient = new MongoClient(databaseConnectionString);
(async () => {
  await mongoClient.connect();
})();

const mongoDb = mongoClient.db(databaseName);

module.exports = {
  mongoDb,
  mongoClient,
};
