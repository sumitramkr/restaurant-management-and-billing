import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import md5 from "md5";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = ({ authenticated, setAuthenticated }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = useState("");
  let [recieved, setRecieved] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loadPassword = async () => {
    const response = await axios.get("http://localhost:5000/login");
    setPassword(response.data);
  };

  useEffect(() => {
    loadPassword();
  }, []);

  const manageRecieved = (e) => {
    setRecieved(md5(e.target.value));
  };

  const submitPassword = (e) => {
    e.preventDefault();

    if (password !== recieved) {
      toast.error("Wrong Password! Try Again");
    } else {
      setAuthenticated(1);
      toast.success("Yayy! Redirecting in 3...2...1");
    }
  };

  useEffect(() => {
    if (authenticated === 1) {
      const timer = setTimeout(() => {
        navigate("/home");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [authenticated, navigate]);

  return (
    <div>
      <h1>WELCOME AGAIN!</h1>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          onChange={manageRecieved}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        <Button
          variant="contained"
          onClick={submitPassword}
          color="success"
          size="large"
        >
          SUBMIT
        </Button>
      </FormControl>
    </div>
  );
};

export default Login;
