import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { toast, ToastContainer } from "react-toastify";

const Invoice = ({
  authenticated,
  foodData,
  setFoodData,
  billList,
  setBillList,
  billData,
  setBillData,
  rates,
  setRates,
}) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const [name, setName] = useState("");
  const [radio, setRadio] = useState("");
  const [tableNo, setTableNo] = useState(0);
  const [billType, setBillType] = useState("");
  const [tempValue, setTempValue] = useState({
    food_name: "",
    quantity: 0,
    rate: 0,
    amount: 0,
  });

  const loadMenu = async () => {
    const response = await axios.get("http://localhost:5000/menu");
    setFoodData(response.data);
  };

  useEffect(() => {
    loadMenu();
  }, []);

  const nameChange = (e) => {
    setName(e.target.value);
  };

  const radioChange = (e) => {
    setRadio(e.target.value);
  };

  const quantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAdd = (e) => {
    let rate = 0;
    let amount = 0;

    if (!tableNo || !billType || !name || !radio || !quantity) {
      toast.error("Enter All Fields!");
    } else {
      toast.success("Successfully Added!");
      for (let i = 0; i < foodData.length; i++) {
        if (foodData[i].food_name === name && radio === "half_quantity") {
          rate = foodData[i].half_price;
          break;
        } else if (
          foodData[i].food_name === name &&
          radio !== "half_quantity"
        ) {
          rate = foodData[i].full_price;
          break;
        }
      }

      amount = rate * quantity;

      setTempValue(() => ({
        food_name: name,
        quantity: parseInt(quantity),
        rate: rate,
        amount: amount,
      }));
    }
  };

  useEffect(() => {
    if (tempValue.food_name !== "") {
      setBillList((billList) => [...billList, tempValue]);
    }
  }, [tempValue]);

  useEffect(() => {
    // console.log(billList);
    setName("");
    setQuantity(0);
    setRadio("");
  }, [billList]);

  const getRates = async () => {
    const response = await axios.get("http://localhost:5000/getRates");
    setRates((rates) => ({
      ...rates,
      CGST: response.data.CGST,
      SGST: response.data.SGST,
    }));
  };

  useEffect(() => {
    getRates();
  }, [rates]);

  const [timestamp, setTimestamp] = useState(new Date().getTime());
  const d = new Date();
  const date = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();

  const fixedChange = (e) => {
    e.target.name === "table_no" && setTableNo(e.target.value);
    e.target.name === "bill_type" && setBillType(e.target.value);
  };

  let amounts = 0.00;
  let totalAmount = 0.00;
  let taxAmount = 0.00;
  const GSTIN = 123456789;

  const handleFinish = (e) => {
    for (let i = 0; i < billList.length; i++) {
      amounts += billList[i].amount;
    }
    totalAmount = (amounts + ((rates.CGST + rates.SGST) / 100) * amounts).toFixed(2);
    taxAmount = (((rates.CGST + rates.SGST) / 100) * amounts).toFixed(2);
    console.log(amounts + " " + totalAmount + " " + taxAmount);
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-billno"
          disabled
          name="bill_no"
          label="Bill Number"
          value={timestamp}
          helperText="Bill Number"
          type="number"
          onChange={fixedChange}
        />
        <TextField
          id="outlined-date"
          disabled
          name="date"
          label="Date"
          value={date}
          helperText="Date"
          type="date"
          onChange={fixedChange}
        />
        <TextField
          id="outlined-select-tableno"
          name="table_no"
          label="Table Number"
          value={tableNo || ""}
          helperText="Select Table Number"
          type="number"
          onChange={fixedChange}
        />
        <TextField
          id="outlined-select-billtype"
          select
          name="bill_type"
          label="Bill Type"
          value={billType || ""}
          helperText="Online/Offline"
          onChange={fixedChange}
        >
          <MenuItem value="Offline">Offline</MenuItem>
          <MenuItem value="Online">Online</MenuItem>
        </TextField>
        <br></br>
        <TextField
          id="outlined-select-food"
          select
          name="food_name"
          label="Item"
          value={name}
          helperText="Select the food item"
          onChange={nameChange}
        >
          {foodData.map((foodData) => (
            <MenuItem key={foodData.food_name} value={foodData.food_name}>
              {foodData.food_name}
            </MenuItem>
          ))}
        </TextField>
        <br></br>

        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Select One
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={radio}
            onChange={radioChange}
          >
            <FormControlLabel
              value="full_quantity"
              name="full_quantity"
              control={<Radio />}
              label="Full"
            />
            <FormControlLabel
              value="half_quantity"
              name="half_quantity"
              control={<Radio />}
              label="Half"
            />
            <FormControlLabel
              value="na"
              name="na"
              control={<Radio />}
              label="Not Applicable"
            />
          </RadioGroup>
        </FormControl>
        <br></br>
        <TextField
          id="outlined-select-quantity"
          name="quantity"
          label="Quantity"
          value={quantity || ""}
          helperText="Select the quantity"
          type="number"
          onChange={quantityChange}
        />
        <br></br>
        <Button
          variant="contained"
          color="success"
          onClick={handleAdd}
          endIcon={<AddShoppingCartIcon />}
        >
          ADD
        </Button>
        <br></br>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleFinish}
          endIcon={<SendIcon />}
        >
          FINISH
        </Button>
      </Box>
    </div>
  );
};

export default Invoice;
