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
import PostAddTwoToneIcon from "@mui/icons-material/PostAddTwoTone";
import CheckCircleOutlineTwoToneIcon from "@mui/icons-material/CheckCircleOutlineTwoTone";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import HomeIcon from '@mui/icons-material/Home';
import "./Invoice.css";

const Invoice = ({
  authenticated,
  foodData,
  setFoodData,
  billList,
  setBillList,
  billMetaData,
  setBillMetaData,
  rates,
  setRates,
}) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const [name, setName] = useState("");
  const [radio, setRadio] = useState("");
  // const [tableNo, setTableNo] = useState(0);
  // const [billType, setBillType] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMode, setPaymentMode] = useState("");
  const [tempValue, setTempValue] = useState({
    food_name: "",
    quantity: 0,
    rate: 0,
    amount: 0,
    quantity_type: "",
  });

  const loadMenu = async () => {
    const response = await axios.get("http://localhost:5000/menu");
    setFoodData(response.data);
  };

  useEffect(() => {
    loadMenu();
  }, []);

  const nameChange = (e) => {
    setName(() => e.target.value);
  };

  const radioChange = (e) => {
    setRadio(() => e.target.value);
  };

  const quantityChange = (e) => {
    e.target.name === "quantity" && setQuantity(() => e.target.value);
    e.target.name === "discount" && setDiscount(() => e.target.value);
  };

  useEffect(() => {
    // console.log(quantity + " " + discount);
  }, [quantity, discount, radio, name]);

  const handleAdd = (e) => {
    let rate = 0;
    let amount = 0;
    let updated = 0;
    if (!name || !radio || !quantity || !discount || !paymentMode) {
      toast.error("Enter All Fields!");
    } else {
      for (let i = 0; i < billList.length; i++) {
        if (
          billList[i].food_name === name &&
          billList[i].quantity_type === radio
        ) {
          toast.success("Updated old quantity!");
          updated = 1;

          const newArr = [...billList];
          newArr[i].quantity = parseInt(quantity);
          newArr[i].amount = billList[i].rate * parseInt(quantity);
          setBillList(() => {
            return newArr;
          });
          break;
        }
      }

      if (updated === 0) {
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

        setTempValue(() => {
          return {
            food_name: name,
            quantity: parseInt(quantity),
            rate: rate,
            amount: amount,
            quantity_type: radio,
          };
        });
      }
    }
    updated = 0;
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
  }, []);

  const [timestamp, setTimestamp] = useState(new Date().getTime());
  const d = new Date();
  const date = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();

  // const fixedChange = (e) => {
  //   e.target.name === "table_no" && setTableNo(() => e.target.value);
  //   e.target.name === "bill_type" && setBillType(() => e.target.value);
  // };

  let amounts = 0.0;
  let discountAmount = 0.0;
  let discountedAmount = 0.0;
  let taxAmount = 0.0;
  let finalAmount = 0.0;

  const handleFinish = (e) => {
    if (window.confirm("Create Invoice? (check Table number & Bill Type)")) {
      for (let i = 0; i < billList.length; i++) {
        amounts += billList[i].amount;
      }

      discountAmount = ((discount / 100) * amounts).toFixed(2);
      discountedAmount = (amounts - discountAmount).toFixed(2);
      taxAmount = (
        ((rates.CGST + rates.SGST) / 100) *
        discountedAmount
      ).toFixed(2);
      finalAmount = (
        parseFloat(discountedAmount) + parseFloat(taxAmount)
      ).toFixed(2);
    }

    setBillMetaData(() => [
      {
        bill_no: timestamp,
        date: date,
        payment_mode: paymentMode,
        CGST: rates.CGST,
        SGST: rates.SGST,
        initial_amount: amounts,
        discount: parseFloat(discount),
        discount_amount: parseFloat(discountAmount),
        discounted_amount: parseFloat(discountedAmount),
        tax_amount: parseFloat(taxAmount),
        final_amount: parseFloat(finalAmount),
      },
      ...billList,
    ]);
    toast.success("Generating Bill...");
    setTimeout(() => {
      navigate("/printInvoice");
    }, 3000);
    // console.log(billMetaData);
  };

  const handlePaymentMode = (e) => {
    setPaymentMode(() => e.target.value);
  };

  const handleDelete = (e) => {
    for (let i = 0; i < billList.length; i++) {
      if (
        billList[i].food_name === name &&
        billList[i].quantity_type === radio
      ) {
        const newArr = [...billList];
        newArr.splice(i, 1);
        setBillList(() => newArr);
        break;
      } else {
        toast.error("Item and Portion are NOT in bill!");
      }
    }
  };

  const handleHome = () => {
    navigate("/home");
  };

  return (<div>
    
    <div className="flex-container">
      <div className="flex-child">
      <Button
            variant="contained"
            color="primary"
            onClick={handleHome}
            endIcon={<HomeIcon />}
            align="left"
            className="left-home-btn"
          ></Button>
          <br></br>
          <br></br>
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
          />
          <TextField
            id="outlined-date"
            disabled
            name="date"
            label="Date"
            value={date}
            helperText="Date"
            type="date"
          />
          <br></br>

          <TextField
            id="outlined-discount"
            name="discount"
            label="Discount"
            value={discount || ""}
            helperText="Select the discount"
            type="number"
            onChange={quantityChange}
          />
          <TextField
            id="outlined-select-payment-mode"
            select
            name="payment_mode"
            label="Payment Mode"
            value={paymentMode || ""}
            helperText="Select the payment mode"
            onChange={handlePaymentMode}
          >
            <MenuItem value="Cash">Cash</MenuItem>
            <MenuItem value="Debit Card">Debit Card</MenuItem>
            <MenuItem value="Credit Card">Credit Card</MenuItem>
            <MenuItem value="UPI">UPI</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
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
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: 28,
                },
              }}
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
            endIcon={<PostAddTwoToneIcon />}
          >
            ADD / UPDATE
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            endIcon={<DeleteIcon />}
          >
            DELETE ITEM
          </Button>
          <br></br>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleFinish}
            endIcon={<CheckCircleOutlineTwoToneIcon />}
          >
            FINISH
          </Button>
        </Box>
      </div>

      <div className="flex-child">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell align="center">Item</TableCell>
                  <TableCell align="center">Qty</TableCell>
                  <TableCell align="center">Rate</TableCell>
                  <TableCell align="center">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {billList.map((foodData, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell align="center">
                      {foodData.quantity_type === "half_quantity"
                        ? foodData.food_name + "(H)"
                        : foodData.food_name + "(F)"}
                    </TableCell>
                    <TableCell align="center">{foodData.quantity}</TableCell>
                    <TableCell align="center">{foodData.rate}</TableCell>
                    <TableCell align="center">{foodData.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
    </div>
  );
};

export default Invoice;
