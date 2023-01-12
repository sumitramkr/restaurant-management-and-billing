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
import "./styles/Invoice.css";
import Navbar from "./Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import BottomNavigation from "@mui/material/BottomNavigation";

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
  const { isAuthenticated } = useAuth0();

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
    const response = await axios.get("https://kalikaapi.up.railway.app/menu");
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
    e.target.name === "quantity" && setQuantity(() => parseInt(e.target.value));
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
    const response = await axios.get("https://kalikaapi.up.railway.app/getRates");
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
  console.log(d);
  const date =
    d.getFullYear() +
    "-" +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + d.getDate()).slice(-2);

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
    if (!discount || !paymentMode) {
      toast.error("Enter All Fields!");
    } else {
      if (window.confirm("Create Invoice? Check DISCOUNT again!!!")) {
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
          setBillList(() => []);
          navigate("/printInvoice");
        }, 3000);
        // console.log(billMetaData);
      }
    }
  };

  const handlePaymentMode = (e) => {
    setPaymentMode(() => e.target.value);
  };

  // const handleDelete = (e) => {
  //   for (let i = 0; i < billList.length; i++) {
  //     if (
  //       billList[i].food_name === name &&
  //       billList[i].quantity_type === radio
  //     ) {
  //       const newArr = [...billList];
  //       newArr.splice(i, 1);
  //       setBillList(() => newArr);
  //       break;
  //     } else {
  //       toast.error("Item and Portion are NOT in bill!");
  //     }
  //   }
  // };

  const handleDelete1 = (i) => {
    const newArr = [...billList];
    if (billList[i].quantity_type === "half_quantity") {
      toast.success(billList[i].food_name + " (Half) Deleted!");
    } else if (billList[i].quantity_type === "full_quantity") {
      toast.success(billList[i].food_name + " (Full) Deleted!");
    } else {
      toast.success(billList[i].food_name + " Deleted!");
    }

    newArr.splice(i, 1);
    setBillList(() => newArr);
  };

  return (
    isAuthenticated && (
      <div>
        <div className="navbar">
          <Navbar showText="INVOICE & PREVIEW" />
        </div>
        <div className="flex-container">
          <div className="flex-child">
            <div>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <div className="invoice-r1">
                  <TextField
                    id="outlined-billno"
                    disabled
                    name="bill_no"
                    label="Bill Number"
                    value={timestamp}
                    type="number"
                  />
                  <TextField
                    id="outlined-date"
                    disabled
                    name="date"
                    label="Date"
                    value={date}
                    type="date"
                  />
                </div>
                <br></br>
                <div className="invoice-r2">
                  <TextField
                    error={discount < 0}
                    helperText={discount < 0 && "(-) Negative Input"}
                    id="outlined-discount"
                    name="discount"
                    label="Discount"
                    value={discount || ""}
                    type="number"
                    onChange={quantityChange}
                  />
                  <TextField
                    id="outlined-select-payment-mode"
                    select
                    name="payment_mode"
                    label="Payment Mode"
                    value={paymentMode || ""}
                    onChange={handlePaymentMode}
                  >
                    <MenuItem value="Cash">Cash</MenuItem>
                    <MenuItem value="Debit Card">Debit Card</MenuItem>
                    <MenuItem value="Credit Card">Credit Card</MenuItem>
                    <MenuItem value="UPI">UPI</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                </div>
                <br></br>
                <div className="invoice-r3">
                  <TextField
                    id="outlined-select-food"
                    select
                    name="food_name"
                    label="Item"
                    value={name}
                    onChange={nameChange}
                  >
                    {foodData.map((foodData) => (
                      <MenuItem
                        key={foodData.food_name}
                        value={foodData.food_name}
                      >
                        {foodData.food_name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <br></br>
                <div className="invoice-r4">
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
                </div>
                <br></br>
                <div className="invoice-r5">
                  <TextField
                    error={quantity < 0}
                    helperText={quantity < 0 && "(-) Negative Input"}
                    id="outlined-select-quantity"
                    name="quantity"
                    label="Quantity"
                    value={quantity || ""}
                    type="number"
                    onChange={quantityChange}
                  />
                </div>
                <br></br>
                <div className="invoice-r6">
                  <Button
                    className="add"
                    variant="contained"
                    color="success"
                    onClick={handleAdd}
                    endIcon={<PostAddTwoToneIcon />}
                  >
                    ADD / UPDATE
                  </Button>
                </div>
                <br></br>
                <div className="invoice-r7">
                  <Button
                    className="fin"
                    variant="outlined"
                    color="primary"
                    onClick={handleFinish}
                    endIcon={<CheckCircleOutlineTwoToneIcon />}
                  >
                    FINISH
                  </Button>
                </div>
              </Box>
            </div>
          </div>

          <div className="flex-child">
            <div></div>
            <div>
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 440 }} className="invoice-ppr">
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" className="invoiceTb">
                          No.
                        </TableCell>
                        <TableCell align="center" className="invoiceTb">
                          Item
                        </TableCell>
                        <TableCell align="center" className="invoiceTb">
                          Qty
                        </TableCell>
                        <TableCell align="center" className="invoiceTb">
                          Rate
                        </TableCell>
                        <TableCell align="center" className="invoiceTb">
                          Price
                        </TableCell>
                        <TableCell
                          align="center"
                          className="deleteCell"
                        ></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {billList.map((foodData, i) => (
                        <TableRow
                          key={i}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row" className="first-col-invoice">
                            {i + 1}
                          </TableCell>
                          <TableCell align="center">
                            {foodData.quantity_type === "half_quantity"
                              ? foodData.food_name + "(H)"
                              : foodData.food_name + "(F)"}
                          </TableCell>
                          <TableCell align="center">
                            {foodData.quantity}
                          </TableCell>
                          <TableCell align="center">{foodData.rate}</TableCell>
                          <TableCell align="center">
                            {foodData.amount}
                          </TableCell>
                          <TableCell align="center" className="deleteColumn">
                            <Button
                              color="inherit"
                              size="small"
                              onClick={() => handleDelete1(i)}
                              endIcon={<DeleteIcon />}
                            ></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </div>
          </div>
        </div>
        <div>
          <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
            elevation={3}
          >
            <BottomNavigation sx={{ backgroundColor: 'primary.main' }} />
          </Paper>
        </div>
      </div>
    )
  );
};

export default Invoice;
