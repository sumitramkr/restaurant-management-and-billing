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
  const sqlSelect = "SELECT * FROM menu ORDER BY food_name";
  db.query(sqlSelect, (error, result) => {
    error && console.log(error);
    res.send(result);
  });
});

app.get("/editMenuItem/:food_id", (req, res) => {
  const { food_id } = req.params;

  const sqlSelect = "SELECT * FROM menu WHERE food_id = ?";
  db.query(sqlSelect, food_id, (error, result) => {
    error && console.log(error);
    res.send(result);
  });
});

app.post("/getNewRates", (req, res) => {
  const { CGST, SGST } = req.body;
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
  const { food_name, category, half_price, full_price } = req.body;
  console.log({ food_name, category, half_price, full_price });

  const sqlInsert =
    "INSERT INTO menu (food_name, category, half_price, full_price) VALUES (?, ?, ?, ?)";
  db.query(
    sqlInsert,
    [food_name, category, parseInt(half_price), parseInt(full_price)],
    (error, result) => {
      error && console.log(error);
    }
  );
});

app.post("/billData", (req, res) => {
  const billData = req.body;
  const {
    bill_no,
    date,
    initial_amount,
    discount_amount,
    tax_amount,
    final_amount,
  } = billData[0];
  console.log(billData);

  const sqlInsert =
    "INSERT INTO stats (date, food_name, amount, bill_no, subtotal, discount_amount, tax_amount, final_amount ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  for (let i = 1; i < billData.length; i++) {
    const { food_name, amount } = billData[i];
    db.query(
      sqlInsert,
      [
        date,
        food_name,
        amount,
        bill_no,
        initial_amount,
        discount_amount,
        tax_amount,
        final_amount,
      ],
      (error, result) => {
        error && console.log(error);
      }
    );
  }
});

app.delete("/deleteItem/:food_id", (req, res) => {
  const { food_id } = req.params;
  const sqlRemove = "DELETE FROM menu WHERE food_id = ?";
  db.query(sqlRemove, food_id, (error, result) => {
    error && console.log(error);
  });
});

app.put("/editMenuItem/:food_id", (req, res) => {
  const { food_id } = req.params;
  const { food_name, category, half_price, full_price } = req.body;
  const sqlUpdate =
    "UPDATE menu SET food_name = ?, category = ?, half_price = ?, full_price = ? WHERE food_id = ?";
  db.query(
    sqlUpdate,
    [food_name, category, half_price, full_price, food_id],
    (error, result) => {
      error && console.log(error);
      res.send(result);
    }
  );
});

app.listen(5000, () => {
  console.log("listening at port 5000");
});
