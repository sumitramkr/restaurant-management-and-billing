require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const md5 = require("md5");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "billing",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Default home route");
});

app.get("/login", (req, res) => {
  res.send(process.env.LOGIN_PASSWORD);
});

app.get("/getRates", (req, res) => {
  const sqlSelect = "SELECT * FROM tax";
  db.query(sqlSelect, (error, result) => {
    error && console.log(error);
    res.send(result[0]);
  });
});

app.get("/menu", (req, res) => {
  const sqlSelect = "SELECT * FROM menu";
  db.query(sqlSelect, (error, result) => {
    error && console.log(error);
    res.send(result);
    // console.log(result);
  });
});

app.post("/getNewRates", (req, res) => {
  const { CGST, SGST } = req.body;
  // console.log({ CGST, SGST });

  if (typeof CGST === "number" && typeof SGST === "number") {
    const sqlTruncate = "TRUNCATE TABLE tax";
    db.query(sqlTruncate, (error, result) => {
      error && console.log(error);
    });

    const sqlInsert = "INSERT INTO tax (CGST, SGST) VALUES (?, ?)";
    db.query(sqlInsert, [CGST, SGST], (error, result) => {
      error && console.log(error);
    });
  }
});

app.post("/addMenuItem", (req, res) => {
  const {food_name, category, half_price, full_price} = req.body;
  console.log({food_name, category, half_price, full_price});

  const sqlInsert = "INSERT INTO menu (food_name, category, half_price, full_price) VALUES (?, ?, ?, ?)";
  db.query(sqlInsert, [food_name, category, parseInt(half_price), parseInt(full_price)], (error, result) => {
    error && console.log(error);
  });
});

app.delete("/deleteItem/:food_id", (req, res) => {
  const {food_id} = req.params;
  const sqlRemove = "DELETE FROM menu WHERE food_id = ?";
  db.query(sqlRemove, food_id, (error, result) => {
    error && console.log(error);
  });
});

app.listen(5000, () => {
  console.log("listening at port 5000");
});
