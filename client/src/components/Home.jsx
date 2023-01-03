import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./styles/Home.css";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";

const Home = ({ authenticated }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      <div className="navbar">
        <Navbar showText="DASHBOARD" />
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
                isAuthenticated
                  ? navigate("/invoice")
                  : toast.error("Please Login");
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
                isAuthenticated
                  ? navigate("/menu")
                  : toast.error("Please Login");
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
                isAuthenticated
                  ? navigate("/showStats")
                  : toast.error("Please Login");
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
                isAuthenticated
                  ? navigate("/tax")
                  : toast.error("Please Login");
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
