// get gratitudes by user_id
// get gratitidue by id

const client = require("./connection");

const getAllGratitudes = () => {
  client
    .query("select id, description, user_id FROM gratitudes")
    .then((response) => {
      return response.rows;
    });
};

module.exports = {
  getAllGratitudes,
};
