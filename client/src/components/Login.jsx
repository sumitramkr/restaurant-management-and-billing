import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useAuth0 } from "@auth0/auth0-react";
import "./styles/Login.css";
import Navbar from "./Navbar";

const Login = ({ authenticated, setAuthenticated }) => {
  const navigate = useNavigate();
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  isAuthenticated && navigate("/home");

  return (
    <div>
      <div className="navbar">
        <Navbar showText="ADMIN" />
      </div>
      <div>
        <h1 className="loginHead">KALIKA DHABA</h1>

        <h2 className="loginSub">WELCOME AGAIN!</h2>
      </div>
      <div>
        (
        <Button
          className="login-btn"
          variant="contained"
          onClick={() => loginWithRedirect()}
          color="primary"
          size="large"
        >
          Click Here To Login
        </Button>
        ) (
        <Button
          className="login-btn"
          variant="contained"
          onClick={() => logout({ returnTo: window.location.origin })}
          color="primary"
          size="large"
        >
          Logout
        </Button>
        )
      </div>
    </div>
  );
};

export default Login;
