import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Home = ({ authenticated }) => {
  const navigate = useNavigate();

  console.log(authenticated);
  return (
    authenticated === 1 && (
      <div>
        <Box sx={{ "& button": { m: 1 } }}>
          <div>
            <Button
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
              color="success"
              variant="contained"
              size="large"
              onClick={() => {
                navigate("/stats");
              }}
            >
              Stats
            </Button>

            <Button
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
    )
  );
};

export default Home;
