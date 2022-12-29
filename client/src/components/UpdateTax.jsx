import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";

const UpdateTax = ({ authenticated, rates, setRates }) => {
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRates((rates) => ({
      ...rates,
      [name]: parseInt(value),
    }));
  };

  const updateRates = (e) => {
    e.preventDefault();
    if (!rates.CGST || !rates.SGST) {
      toast.error("Enter All Fields!");
    } else {
      axios
        .post("http://localhost:5000/getNewRates", { ...rates })
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
    console.log(rates);
  }, [rates]);

  return (
    <div>
    <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate("/home");
            }}
            endIcon={<HomeIcon />}
            align="left"
            className="left-home-btn"
          ></Button>
          <br></br>
          <br></br>
      <h1>Taxes</h1>
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
          id="outlined-required"
          label="CGST"
          type="number"
          name="CGST"
          onChange={handleChange}
          value={rates.CGST || ""}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
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

        <br></br>

        <Button
          variant="contained"
          onClick={updateRates}
          color="success"
          size="large"
        >
          UPDATE TAXES
        </Button>
      </Box>
    </div>
  );
};

export default UpdateTax;
