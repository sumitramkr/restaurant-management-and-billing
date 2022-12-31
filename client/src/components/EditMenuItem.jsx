import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import { toast } from "react-toastify";
import "./styles/AddEditMenuItem.css";

const EditMenuItem = ({ autheticated }) => {
  const navigate = useNavigate();
  const { food_id } = useParams();

  const [food, setFood] = useState({
    food_name: "",
    category: "",
    half_price: null,
    full_price: null,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/editMenuItem/${food_id}`)
      .then((response) => setFood(response.data[0]));
  }, [food_id]);

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
      toast.success("Successfully Updated!");
      axios
        .put(`http://localhost:5000/editMenuItem/${food_id}`, { ...food })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
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
        <h1 className="addEditItemHead">Edit Item</h1>
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
          <div>
            <TextField
              required
              id="outlined-required"
              label="Food Name"
              name="food_name"
              value={food.food_name || ""}
              onChange={loadFood}
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="Category"
              name="category"
              value={food.category || ""}
              onChange={loadFood}
            />
          </div>
          <div>
            <TextField
              type="number"
              required
              id="outlined-required"
              label="Half Price"
              name="half_price"
              value={food.half_price || ""}
              onChange={loadFood}
            />
          </div>
          <div>
            <TextField
              type="number"
              required
              id="outlined-required"
              label="Full Price"
              name="full_price"
              value={food.full_price || ""}
              onChange={loadFood}
            />
          </div>
          <Button
          className="addEditItem-btm"
            color="success"
            variant="contained"
            size="large"
            onClick={addFood}
          >
            UPDATE ITEM
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default EditMenuItem;
