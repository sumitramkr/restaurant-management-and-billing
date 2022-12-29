import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Stats = ({ authenticated }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [sales, setSales] = useState([
    {
      subtotal: 0,
      discount_amount: 0,
      tax_amount: 0,
      final_amount: 0,
    },
    {
      food_name: "-",
      total_sales: 0,
    },
  ]);

  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [rdate1, setrDate1] = useState("0000-00-00");
  const [rdate2, setrDate2] = useState("0000-00-00");

  const loadFoodSales = async (e) => {
    // e.preventDefault();
    const response = await axios.get(
      `http://localhost:5000/showStats/${rdate1}/${rdate2}`
    );
    setSales(response.data);
  };

  const handleDate1 = (beginDate1) => {
    setDate1(() => beginDate1);
  };

  const handleDate2 = (beginDate2) => {
    setDate2(() => beginDate2);
  };

  useEffect(() => {
    let date_not_formatted1 = new Date(date1);
    let date_not_formatted2 = new Date(date2);

    let formatted_string1 = date_not_formatted1.getFullYear() + "-";
    let formatted_string2 = date_not_formatted2.getFullYear() + "-";

    if (date_not_formatted1.getMonth() < 9) {
      formatted_string1 += "0";
    }

    if (date_not_formatted2.getMonth() < 9) {
      formatted_string2 += "0";
    }

    formatted_string1 += date_not_formatted1.getMonth() + 1;
    formatted_string1 += "-";
    formatted_string2 += date_not_formatted2.getMonth() + 1;
    formatted_string2 += "-";

    if (date_not_formatted1.getDate() < 10) {
      formatted_string1 += "0";
    }
    if (date_not_formatted2.getDate() < 10) {
      formatted_string2 += "0";
    }

    formatted_string1 += date_not_formatted1.getDate();
    formatted_string2 += date_not_formatted2.getDate();

    setrDate1(() => formatted_string1);
    setrDate2(() => formatted_string2);

    // console.log(formatted_string1 + " " + formatted_string2);
  }, [date1, date2]);

  useEffect(() => {
    // console.log(rdate1 + " " + rdate2);
  }, [rdate1, rdate2]);

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/home")}
        endIcon={<HomeIcon />}
        align="right"
        style={{ position: "absolute", top: "0", left: "0" }}
        className="hidden-print"
      ></Button>
      <br></br>
      <br></br>
      <br></br>

      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Begin"
            color="success"
            inputFormat="YYYY-MM-DD"
            value={date1 ?? ""}
            onChange={handleDate1}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="End"
            inputFormat="YYYY-MM-DD"
            value={date2 ?? ""}
            onChange={handleDate2}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button
          color="success"
          variant="contained"
          size="large"
          onClick={loadFoodSales}
        >
          SUBMIT
        </Button>
      </div>
      <div>
        <Paper
          sx={{
            width: "55%",
            overflow: "hidden",
            textAlign: "center",
            margin: "auto",
          }}
        >
          <TableContainer sx={{ maxHeight: "40rem" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Sr. No.</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Food Name</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Total Sales</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sales.slice(1).map((salesData, i) => (
                  <TableRow
                    key={salesData.food_name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell align="center">{salesData.food_name}</TableCell>
                    <TableCell align="center">
                      ₹ {salesData.total_sales}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <br></br>
        <Button variant="contained" color="error" onClick={handleClickOpen}>
          More Information
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <u>{"Data from " + rdate1 + " to " + rdate2}</u>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <strong>Subtotal: ₹ {sales[0].subtotal}</strong>
              <br></br>
              <br></br>
              <strong>Discounts: ₹ {sales[0].discount_amount}</strong>
              <br></br>
              <br></br>
              <strong>Total Taxes: ₹ {sales[0].tax_amount}</strong>
              <br></br>
              <br></br>
              <strong>Total Sales: ₹ {sales[0].final_amount.toFixed(2)}</strong>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Looks Good?
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Stats;
