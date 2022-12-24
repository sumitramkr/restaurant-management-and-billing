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
  console.log({ CGST, SGST });

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

app.listen(5000, () => {
  console.log("listening at port 5000");
});
