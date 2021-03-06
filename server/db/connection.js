const { Client } = require("pg");

const config = {
  user: process.env.GRAT_USER,
  host: process.env.GRAT_HOST,
  database: process.env.GRAT_DATABASE,
  password: process.env.GRAT_PASSWORD,
  port: process.env.DB_PORT,
};

const client = new Client(config);

client.connect().catch((err) => {
  console.log("Database connection not working");
});

module.exports = client;
