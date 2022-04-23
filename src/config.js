require("dotenv").config();
const utils = require("./common/utils");

const PORT = process.env.PORT;
const databaseConnectionString = process.env.DB_URL;
const databaseName = process.env.DB_NAME;


if (
  utils.isNullOrEmpty(databaseConnectionString) ||
  utils.isNullOrEmpty(databaseName)
) {
  console.error("Kashier service falied to start, invalid configurations");
  process.exit(1);
}

module.exports = {
  PORT,
  databaseConnectionString,
  databaseName
};
