import React, { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./styles/UpdateTax.css";
import Navbar from "./Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import BottomNavigation from '@mui/material/BottomNavigation';
import Paper from '@mui/material/Paper';

const UpdateTax = ({ authenticated, rates, setRates }) => {
  const { isAuthenticated } = useAuth0();

  const getRates = async () => {
    const response = await axios.get("https://kalika-dhaba-backend.onrender.com/getRates");
    setRates((rates) => ({
      ...rates,
      CGST: response.data.CGST,
      SGST: response.data.SGST,
    }));
  };

  useEffect(() => {
    getRates();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRates((rates) => ({
      ...rates,
      [name]: parseFloat(value),
    }));
  };

  const updateRates = (e) => {
    e.preventDefault();
    if (!rates.CGST || !rates.SGST) {
      toast.error("Enter All Fields!");
    } else {
      axios
        .post("https://kalika-dhaba-backend.onrender.com/getNewRates", { ...rates })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));

      if (typeof rates.CGST === "number" && typeof rates.SGST === "number") {
        toast.success("Taxes Updated!");
      } else {
        toast.error("Error!");
      }
    }
  };

  useEffect(() => {
    // console.log(rates);
  }, [rates]);

  return (
    isAuthenticated && (
      <div>
        <div className="navbar">
          <Navbar showText="UPDATE TAX" />
        </div>
        <div className="below-navbar">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="tax-text">
              <TextField
                className="tax"
                error={rates.CGST < 0}
                helperText={rates.CGST < 0 && "(-) Negative Input"}
                id="outlined-required"
                label="CGST"
                type="number"
                name="CGST"
                onChange={handleChange}
                value={rates.CGST || ""}
              />
            </div>
            <div className="tax-text">
              <TextField
                className="tax"
                error={rates.SGST < 0}
                helperText={rates.CGST < 0 && "(-) Negative Input"}
                id="outlined-required"
                label="SGST"
                type="number"
                name="SGST"
                onChange={handleChange}
                value={rates.SGST || ""}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <br></br>
            <Button
              className="tax-btn"
              variant="contained"
              onClick={updateRates}
              color="success"
              size="large"
            >
              UPDATE TAXES
            </Button>
          </Box>
        </div>
        <div>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation sx={{ backgroundColor: 'primary.main' }} />
        </Paper>
        </div>
      </div>
    )
  );
};

export default UpdateTax;
