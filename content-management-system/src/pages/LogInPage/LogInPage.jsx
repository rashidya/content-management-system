import { Grid, Typography, Container, OutlinedInput } from "@mui/material";
import React from "react";
import "./LogInPage.css";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchUser } from "../../services/SignInService";

export default function SignInPage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (username === "" || password === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [username, password]);

  const handleClick = async () => {
    const params = {
      username: username,
    };
    const res = await fetchUser(params);
    if (res.status === 200) {
      if (res.data.length > 0) {
        if (res.data[0].password === password) {
          navigate("/adminDashboard");
        } else {
          alert("Incorrect Password");
        }
      } else {
        alert("User not found");
      }
    } else {
      alert(res.statusTeaxt);
    }
  };

  return (
    <Grid className="containerSignIn center">
      <div className="card center">
        <div>
          <Typography variant="h4" color="#039BE5">
            Log In
          </Typography>
        </div>
        <div className="d1">
          <OutlinedInput
            fullWidth
            className="txt"
            value={username}
            size="small"
            placeholder="Username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div className=" d1">
          <OutlinedInput
            fullWidth
            className="txt"
            value={password}
            size="small"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div className="center">
          <Button
            className="btnSignIn"
            disabled={disabled}
            variant="contained"
            size="sm"
            onClick={handleClick}
          >
            LOG IN
          </Button>
        </div>
      </div>
    </Grid>
  );
}
