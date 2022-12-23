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
  // const sqlInsert = "INSERT INTO tax (CGST, SGST) VALUES (5, 5)";
  // db.query(sqlInsert, (error, result) => {
  //     console.log("error", error);
  //     console.log("result", result);
  res.send("Default home route");
  // });
});

app.get("/login", (req, res) => {
  res.send(process.env.LOGIN_PASSWORD);
});

app.get("/getRates", (req, res) => {
    const sqlSelect = "SELECT * FROM tax";
    db.query(sqlSelect, (error, result) => {
        console.log(error);
        res.send(result[0]);
        console.log(result[0]);
    })
});

app.listen(5000, () => {
  console.log("api call at port 5000");
});
