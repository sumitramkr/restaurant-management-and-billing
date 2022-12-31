import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./styles/Home.css";

const Home = ({ authenticated }) => {
  const navigate = useNavigate();

  // console.log(authenticated);
  return (
    // authenticated === 1 &&
    <div>
    <div className="dashHeading">
    <h1>KALIKA DHABA</h1>
    </div>
      <div className="box-home">
        <Box sx={{ "& button": { m: 1 } }}>
          <div>
            <Button
            className="home"
              color="success"
              variant="contained"
              size="large"
              onClick={() => {
                navigate("/invoice");
              }}
            >
              Invoice
            </Button>
            <Button
            className="home"
              color="success"
              variant="contained"
              size="large"
              onClick={() => {
                navigate("/menu");
              }}
            >
              Menu
            </Button>
            <Button
            className="home"
              color="success"
              variant="contained"
              size="large"
              onClick={() => {
                navigate("/showStats");
              }}
            >
              Stats
            </Button>
            <Button
            className="home"
              color="success"
              variant="contained"
              size="large"
              onClick={() => {
                navigate("/tax");
              }}
            >
              Tax
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Home;
