import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const ShowMenu = () => {
  const navigate = useNavigate();

  const [foodData, setFoodData] = useState([]);

  const loadMenu = async () => {
    const response = await axios.get("http://localhost:5000/menu");
    setFoodData(response.data);
  };

  useEffect(() => {
    loadMenu();
  }, []);

  return (
    <div>
      <Paper sx={{ width: "70%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Food Id</TableCell>
                <TableCell align="center">Food Name</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Half Price</TableCell>
                <TableCell align="center">Full Price</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {foodData.map((foodData) => (
                <TableRow
                  key={foodData.food_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {foodData.food_id}
                  </TableCell>
                  <TableCell align="center">{foodData.food_name}</TableCell>
                  <TableCell align="center">{foodData.category}</TableCell>
                  <TableCell align="center">{foodData.half_price}</TableCell>
                  <TableCell align="center">{foodData.full_price}</TableCell>
                  <TableCell align="center">
                    <Button
                      color="success"
                      variant="contained"
                      size="small"
                      onClick={() => {
                        navigate("/invoice");
                      }}
                    >
                      Update
                    </Button>

                    <Button
                      color="error"
                      variant="contained"
                      size="small"
                      onClick={() => {
                        navigate("/invoice");
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <br></br>
      <Button
        color="primary"
        variant="contained"
        size="large"
        onClick={() => {
          navigate("/home");
        }}
      >
        HOME PAGE
      </Button>
    </div>
  );
};

export default ShowMenu;