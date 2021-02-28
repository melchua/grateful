const { Client } = require("pg");

const config = {
  user: "kziasgkc",
  host: "ziggy.db.elephantsql.com",
  database: "kziasgkc",
  password: "1EZqcMS8yxIXu6oqs2O3Yym4iUE1sVSI",
  port: 5432,
};

const client = new Client(config);

client.connect();

module.exports = client;
