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

const addUser = (email, username, password) => {
  return client
    .query("INSERT INTO users(email, username, password) VALUES($1,$2,$3)", [
      email,
      username,
      password,
    ])
    .then((res) => {
      console.log("added");
    });
};

const addGratitudeByUserId = (user_id, description) => {
  return client
    .query("INSERT INTO gratitudes(user_id, description) VALUES($1, $2)", [
      user_id,
      description,
    ])
    .then((res) => {
      console.log("gratitude added");
    })
    .catch((err) => {
      console.log("err", err);
      return err;
    });
};

const getGratitudesByUserId = (user_id) => {
  return client
    .query(
      "select users.id, description FROM gratitudes JOIN users ON users.id = user_id WHERE user_id = $1",
      [parseInt(user_id)]
    )
    .then((response) => {
      return response.rows;
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  addUser,
  getGratitudesByUserId,
  addGratitudeByUserId,
};
