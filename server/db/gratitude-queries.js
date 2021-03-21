// get gratitudes by user_id
// get gratitidue by id

const client = require("./connection");

const deleteGratitude = (id) =>
  client
    .query("DELETE FROM gratitudes WHERE id = $1 RETURNING *", [id])
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.error("Err", err);
    });

module.exports = {
  deleteGratitude,
};
