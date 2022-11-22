const mysql = require('mysql');
const express = require("express")
const app = express()
require("dotenv").config()

const db = mysql.createConnection({
  host: "localhost",
  user:"koray",
  password:"M8meta567+-*/",
  database:"test"
})

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', `${process.env.BASE_URL}`);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
	res.header("Access-Control-Expose-Headers", "Set-Cookie",)
  next();
});

app.use(express.json());

app.get("/books", (req,res) => {
  const q = "SELECT * FROM books"
  db.query(q, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q ="SELECT * FROM books WHERE id = ?"

  db.query(q, [bookId], (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `description`, `cover`, `price`) VALUES (?)" ;
  const values = [
    req.body.title,
    req.body.description,
    req.body.cover,
    req.body.price,
  ]

  db.query(q, [values], (err, data) => {
    if(err) return res.json(err)
    return res.json("Book has been created.")
  })
})

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q ="DELETE FROM books WHERE id = ?"

  db.query(q, [bookId], (err, data) => {
    if(err) return res.json(err)
    return res.json("Book has been deleted successfully!")
  })
})

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q ="UPDATE books SET `title` = ?, `description` = ?, `cover` = ?, `price` = ? WHERE id = ?"

  const values = [
    req.body.title,
    req.body.description,
    req.body.cover,
    req.body.price,
  ]
  db.query(q, [...values, bookId], (err, data) => {
    if(err) return res.json(err)
    return res.json("Book has been updated successfully!")
  })
})


app.listen(8800, () => {
  console.log("Connected to backend!");
})