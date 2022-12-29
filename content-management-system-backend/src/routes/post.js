const express = require("express");
const mysql = require("mysql");
const db = require("../configs/db.config");

const connection = mysql.createConnection(db.database);

connection.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    var postTableQuery =
      "CREATE TABLE IF NOT EXISTS posts (id int AUTO_INCREMENT PRIMARY KEY, heading VARCHAR(255), content Varchar(1000))";
    connection.query(postTableQuery, function (err, result) {
      if (err) throw err;
      // console.log(result);
      if (result.warningCount === 0) {
        console.log("POST table created");
      }
    });
  }
});

const router = express.Router();

router.get("/", (req, res) => {
  var query = "SELECT * FROM posts";

  connection.query(query, (err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
});

router.post("/", (req, res) => {
  const heading = req.body.heading;
  const content = req.body.content;

  var query = "INSERT INTO posts (heading, content) VALUES (?,?)";

  connection.query(query, [heading, content], (err) => {
    if (err) {
      res.send({ message: "duplicate entry" });
    } else {
      res.send({ message: "Post created!" });
    }
  });
});

router.put("/", (req, res) => {
  const id = req.body.id;
  const heading = req.body.heading;
  const content = req.body.content;

  var query = "UPDATE posts SET heading =?, content=? WHERE id=?";

  connection.query(query, [heading, content, id], (err, rows) => {
    if (err) console.log(err);

    if (rows.affectedRows > 0) {
      res.send({ message: "Post Updated" });
    } else {
      res.send({ message: "Post not found" });
    }
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  var query = "DELETE FROM posts WHERE id=?";

  connection.query(query, [id], (err, rows) => {
    if (err) console.log(err);

    if (rows.affectedRows > 0) {
      res.send({ message: "post deleted" });
    } else {
      res.send({ message: "post not found" });
    }
  });
});

//get user by id
router.get("/:id", (req, res) => {
  const id = req.params.id;

  var query = "SELECT * FROM posts WHERE id=?";

  connection.query(query, [id], (err, rows) => {
    if (err) console.log(err);

    res.send(rows);
  });
});

module.exports = router;
