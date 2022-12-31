import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import HomeIcon from "@mui/icons-material/Home";
import "./styles/AddEditMenuItem.css";

const AddMenuItem = ({ autheticated, foodData }) => {
  const navigate = useNavigate();

  const [food, setFood] = useState({
    food_name: "",
    category: "",
    half_price: null,
    full_price: null,
  });

  const loadFood = (e) => {
    const { name, value } = e.target;
    setFood((food) => ({
      ...food,
      [name]: value,
    }));
  };

  const addFood = (e) => {
    e.preventDefault();
    if (
      !food.food_name ||
      !food.category ||
      !food.half_price ||
      !food.full_price
    ) {
      toast.error("Enter All Fields!");
    } else {
      let matched = 0;

      for (let i = 0; i < foodData.length; i++) {
        if (foodData[i].food_name === food.food_name) {
          matched = 1;
          break;
        }
      }

      if (matched === 0) {
        toast.success("Successfully Added!");
        axios
          .post("http://localhost:5000/addMenuItem", { ...food })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => console.log(error));
      } else {
        matched = 0;
        toast.error("Item Already Exists!");
      }
      setTimeout(() => navigate("/menu"), 3000);
    }
  };

  return (
    <div>
      <div>
        <Button
          color="primary"
          variant="contained"
          align="left"
        className="left-home-btn"
        endIcon={<HomeIcon />}
          onClick={() => {
            navigate("/home");
          }}
        >
        </Button>
      </div>
      <br></br>
      <div>
        <h1 className="addEditItemHead">ADD ITEM</h1>
      </div>
      <br></br>
      <div>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="addmenutab">
            <TextField
              required
              id="outlined-required"
              label="Food Name"
              name="food_name"
              onChange={loadFood}
            />
          </div>
          <div className="addmenutab">
            <TextField
              required
              id="outlined-required"
              label="Category"
              name="category"
              onChange={loadFood}
            />
          </div>
          <div className="addmenutab">
            <TextField
              type="number"
              required
              id="outlined-required"
              label="Half Price"
              name="half_price"
              onChange={loadFood}
            />
          </div>
          <div className="addmenutab">
            <TextField
              type="number"
              required
              id="outlined-required"
              label="Full Price"
              name="full_price"
              onChange={loadFood}
            />
          </div>
          <Button
            color="success"
            variant="contained"
            size="large"
            className="addEditItem-btm"
            onClick={addFood}
          >
            ADD ITEM
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default AddMenuItem;
