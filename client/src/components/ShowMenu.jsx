import React, { useEffect } from "react";
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
import HomeIcon from "@mui/icons-material/Home";
import { toast } from "react-toastify";
import "./styles/ShowMenu.css";

const ShowMenu = ({ autheticated, foodData, setFoodData }) => {
  const navigate = useNavigate();

  const loadMenu = async () => {
    const response = await axios.get("http://localhost:5000/menu");
    setFoodData(response.data);
  };

  useEffect(() => {
    loadMenu();
  }, [foodData]);

  const deleteItem = (food_id, food_name) => {
    if (window.confirm("Are you sure? " + food_name + " will be deleted!")) {
      axios.delete(`http://localhost:5000/deleteItem/${food_id}`);
      toast.success(food_name + " Deleted Successfully!");
      setTimeout(() => loadMenu(), 2000);
    }
  };

  const handleHome = () => {
    navigate("/home");
  };

  return (
    <div>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleHome}
          endIcon={<HomeIcon />}
          align="left"
          className="left-home-btn menu"
        ></Button>
      </div>
<br></br>
      <div>
        <h1 className="menuHead">MENU</h1>
      </div>
      <br></br>
      <br></br>
      <div className="paper">
        <Paper
          sx={{
            width: "75%",
            overflow: "hidden",
            textAlign: "center",
            margin: "auto",
          }}
        >
          <TableContainer sx={{ maxHeight: "40rem" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell className="menuTb">Food Id</TableCell>
                  <TableCell className="menuTb" align="center">
                    Food Name
                  </TableCell>
                  <TableCell className="menuTb" align="center">
                    Category
                  </TableCell>
                  <TableCell className="menuTb" align="center">
                    Half Price
                  </TableCell>
                  <TableCell className="menuTb" align="center">
                    Full Price
                  </TableCell>
                  <TableCell className="menuTb" align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {foodData.map((foodData) => (
                  <TableRow
                    key={foodData.food_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" className="1stth">
                      {foodData.food_id}
                    </TableCell>
                    <TableCell align="center">{foodData.food_name}</TableCell>
                    <TableCell align="center">{foodData.category}</TableCell>
                    <TableCell align="center">{foodData.half_price}</TableCell>
                    <TableCell align="center">{foodData.full_price}</TableCell>
                    <TableCell align="center">
                      <Button
                        className="tableBtn-edit"
                        color="success"
                        variant="contained"
                        size="small"
                        onClick={() => {
                          navigate(`/editMenuItem/${foodData.food_id}`);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        className="tableBtn-del"
                        color="error"
                        variant="contained"
                        size="small"
                        onClick={() =>
                          deleteItem(foodData.food_id, foodData.food_name)
                        }
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
          className="menuAdd"
          color="success"
          variant="contained"
          size="large"
          onClick={() => {
            navigate("/addMenuItem");
          }}
        >
          ADD ITEM
        </Button>
      </div>
    </div>
  );
};

export default ShowMenu;
