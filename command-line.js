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

const verb = process.argv[2];
let id;
// browse, read, edit, add, delete

switch (verb) {
  case "browse":
    client
      .query("SELECT * FROM movie_villains ORDER BY id")
      .then((response) => {
        console.log(response.rows);
        client.end();
      });
    break;
  case "read":
    id = process.argv[3];
    client
      .query("SELECT * FROM movie_villains WHERE id = $1;", [id])
      .then((response) => {
        console.log(response.rows);
        client.end();
      });
    break;
  case "edit":
    id = process.argv[3];
    const newName = process.argv[4];
    client
      .query("UPDATE movie_villains SET villain = $1 WHERE id = $2", [
        newName,
        id,
      ])
      .then((res) => {
        console.log("villain updated successfully");
        client.end();
      });
    break;
  case "add":
    const villainName = process.argv[3];
    const villainMovie = process.argv[4];
    client
      .query("INSERT INTO movie_villains(villain, movie) VALUES($1, $2) ", [
        villainName,
        villainMovie,
      ])
      .then((res) => {
        console.log("villain added successfully");
        client.end();
      });
    break;
  case "delete":
    id = process.argv[3];
    client
      .query("DELETE FROM movie_villains WHERE id = $1", [id])
      .then((res) => {
        console.log("villain dropped");
        client.end();
      });
    break;
  default:
    console.log("Please enter proper verb");
    client.end();
}
