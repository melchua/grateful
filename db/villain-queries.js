const client = require("./connection");

const getAllVillains = (cb) => {
  client.query("SELECT * FROM movie_villains ORDER BY id").then((response) => {
    cb(response.rows);
  });
};

const getVillainById = (id) => {
  return client
    .query("SELECT * FROM movie_villains WHERE id = $1;", [id])
    .then((response) => {
      return response.rows[0];
    });
};

module.exports = { getAllVillains, getVillainById };
