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
    })
    .catch((err) => {
      console.err("err", err);
    });
};

const getUserBySub = (sub) => {
  return client
    .query("SELECT * FROM users WHERE sub = $1;", [sub])
    .then((response) => {
      return response.rows[0];
    })
    .catch((err) => {
      console.error("err", err);
    });
};

const getUserByEmail = (email) => {
  return client
    .query("SELECT * FROM users WHERE email = $1", [email])
    .then((response) => {
      return response.rows[0];
    });
};

const addUserBySub = (sub) => {
  return client
    .query("INSERT INTO users(sub) VALUES($1)", [sub])
    .then((res) => {
      console.log("added");
    })
    .catch((err) => {
      console.log("err", err);
      return err;
    });
};

const addGratitudeByUserId = (user_id, description) => {
  return client
    .query(
      "INSERT INTO gratitudes(user_id, description) VALUES($1, $2) RETURNING id, user_id, description",
      [user_id, description]
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log("err", err);
      return err;
    });
};

const getGratitudesByUserId = (user_id) => {
  if (!user_id) return [];

  return client
    .query(
      "select gratitudes.id, description, created_at FROM gratitudes JOIN users ON users.id = user_id WHERE user_id = $1",
      [parseInt(user_id)]
    )
    .then((response) => {
      return response.rows;
    })
    .catch((err) => {
      console.log("err", err);
      return [];
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  addUserBySub,
  getGratitudesByUserId,
  addGratitudeByUserId,
  getUserBySub,
};
