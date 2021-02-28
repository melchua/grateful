const client = require("./connection");

const getAllUsers = (cb) => {
  client.query("SELECT * FROM users ORDER BY id").then((response) => {
    cb(response.rows);
  });
};

const getUserById = (id) => {
  return client
    .query("SELECT * FROM users WHERE id = $1;", [id])
    .then((response) => {
      return response.rows[0];
    });
};

const getUserByEmail = (email) => {
  return client
    .query("SELECT * FROM users WHERE email = $1", [email])
    .then((response) => {
      return response.rows[0];
    });
};

module.exports = { getAllUsers, getUserById, getUserByEmail };
