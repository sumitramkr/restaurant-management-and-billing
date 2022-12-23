import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const UpdateTax = () => {
  const [rates, setRates] = useState({
    CGST: 0,
    SGST: 0,
  });

  const getRates = async () => {
    const response = await axios.get("http://localhost:5000/getRates");
    setRates(rates => ({...rates, CGST: response.data.CGST, SGST: response.data.SGST}));
  };

  useEffect(() => {
    getRates();
  }, []);

  console.log(rates);///////////////////////////////////////////////

  return (
    <div>
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
          placeholder={rates.CGST}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          id="outlined-required"
          label="SGST"
          type="number"
          placeholder={rates.SGST}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <br></br>

        <Button
          variant="contained"
          // onClick={submitPassword}
          color="success"
          size="large"
        >
          SUBMIT
        </Button>
      </Box>
    </div>
  );
};

export default UpdateTax;
