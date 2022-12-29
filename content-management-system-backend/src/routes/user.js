const express = require("express");
const mysql = require("mysql");
const db = require("./../configs/db.config");

const connection = mysql.createConnection(db.database);

connection.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    var userTableQuery =
      "CREATE TABLE IF NOT EXISTS users (id int PRIMARY KEY AUTO_INCREMENT, password VARCHAR(8), username Varchar(255),role VARCHAR(5) )";
    connection.query(userTableQuery, function (err, result) {
      if (err) throw err;
      // console.log(result);
      if (result.warningCount === 0) {
        console.log("User table created");
      }
    });
  }
});

const router = express.Router();

router.post("/", (req, res) => {
  const password = req.body.password;
  const username = req.body.username;
  const role = req.body.role;

  var query =
    "INSERT INTO users (password, username, role) VALUES (?,?,?)";

  connection.query(query, [password, username, role], (err) => {
    if (err) {
      res.send({ message: err });
    } else {
      res.send({ message: "user created!" });
    }
  });
});

//get user by id
router.get("/:username", (req, res) => {
  const username = req.params.username;

  var query = "SELECT * FROM users WHERE username=?";

  connection.query(query, [username], (err, rows) => {
    if (err) {
      res.send({ message: err });
    } else {
      res.send(rows);
    }
  });
});

module.exports = router;
