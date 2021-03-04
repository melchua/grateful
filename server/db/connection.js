const { Client } = require("pg");

const config = {
  user: process.env.GRAT_USER,
  host: process.env.GRAT_HOST,
  database: process.env.GRAT_DATABASE,
  password: process.env.GRAT_PASSWORD,
  port: process.env.GRAT_PORT,
};

const client = new Client(config);

client.connect();

module.exports = client;
