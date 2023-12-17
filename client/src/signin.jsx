import React, { useState } from "react";
import { Card, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useRecoilState } from "recoil";
import { userTypeState } from "./usertype";
import { theme } from "./Pallete";
import { ThemeProvider } from "@mui/material/styles";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { OpenSigninState } from "./Appbar";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType] = useRecoilState(userTypeState);
  const [open, setOpen] = useRecoilState(OpenSigninState);

  const handleSignIn = () => {
    if (username.length === 0 || password.length === 0) {
      alert("Username or Password cannot be empty.");
    } else {
      const loginEndpoint = userType === "user" ? "user/login" : "admin/login";
      fetch(`https://codexbackend.onrender.com/${loginEndpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }).then((res) => {
        res.json().then(({ message, token }) => {
          localStorage.setItem("token", token);
          localStorage.setItem("UserType", userType);
          // console.log(message);
          window.location = "/";
        });
      });
      alert("Sign In Successful!");
      // toast.success("Sign In Successful!");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} style={{}}>
        <DialogTitle
          style={{
            background:
              "linear-gradient(132deg, rgba(107, 37, 37, 0.206) 0%, rgba(162, 61, 61, 0.168) 20%, rgba(144, 30, 30, 0.148) 70%, rgba(88, 11, 11, 0.024) 100%)",
            border: "solid rgba(255, 255, 255, 0.06) 1px",
          }}
        >
          <Typography variant="h5" color="error" fontFamily={"Poppins"}>
            <b>Enter your credentials</b>
          </Typography>
        </DialogTitle>
        <DialogContent
          style={{
            width: 400,
            // backgroundColor: "#488de9",
            padding: 30,
            // border: "5px solid #488de9",
            // borderRadius: 15,
          }}
        >
          <ThemeProvider theme={theme}>
            {/* <Card
              variant={"contained"}
              style={{
                width: 400,
                padding: 20,
                // backgroundColor: "#F1F5FE",
              }}
            > */}
            <Toggle />
            <TextField
              fullWidth
              label="Email"
              required={true}
              variant="filled"
              onChange={(u) => {
                setUsername(u.target.value);
              }}
              InputProps={{
                style: {
                  backgroundColor: "#FABCBC63",
                },
              }}
            />
            <br />
            <br />
            <TextField
              fullWidth
              required={true}
              label="Password"
              variant="filled"
              InputProps={{
                style: {
                  backgroundColor: "#FABCBC63",
                },
              }}
              onChange={(p) => {
                setPassword(p.target.value);
              }}
            />
            <br />
            <br />
            <Button
              size={"large"}
              variant="outlined"
              color="error"
              onClick={handleSignIn}
            >
              Sign in
            </Button>
            {/* </Card> */}
          </ThemeProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Toggle() {
  const [userType, setUserType] = useRecoilState(userTypeState);
  return (
    <div style={{ marginBottom: 15 }}>
      <ToggleButtonGroup
        color="error"
        value={userType}
        exclusive
        onChange={(event, newUserType) => {
          console.log(newUserType);
          if (newUserType != null) setUserType(newUserType);
        }}
      >
        <ToggleButton value="user">User</ToggleButton>
        <ToggleButton value="admin">Admin</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

export default Signin;
