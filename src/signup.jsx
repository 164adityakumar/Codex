import { Card, ToggleButtonGroup, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userTypeState } from "./usertype";
import ToggleButton from "@mui/material/ToggleButton";
import { theme } from "./Pallete";
import { ThemeProvider } from "@mui/material/styles";
function signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType] = useRecoilState(userTypeState);
  return (
    <div>
      <div
        style={{
          marginTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" color="initial" fontFamily={"monospace"}>
          Welcome to Inkspace by Aditya Kumar.
          <br />
          Sign up below.
        </Typography>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ThemeProvider theme={theme}>
        <Card
          variant={"outlined"}
          style={{
            width: 400,
            padding: 20,
          }}
          fontFamily={"monospace"}
        >
          <Toggle/>
          <TextField
            fullWidth
            label="Username"
            variant="filled"
            onChange={(u) => {
              setUsername(u.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            fullWidth
            label="Password"
            variant="filled"
            onChange={(p) => {
              console.log(p);
              setPassword(p.target.value);
            }}
          />
          <br />
          <br />
          <Button
            size={"large"}
            variant="outlined"
            color="secondary"
            onClick={() => {
              if(userType === "user"){if (username.length === 0 || password.length === 0) {
                alert("Username or Password cannot be empty.");
              } else {
                const loginEndpoint = userType === "user" ? "user/signup" : "admin/signup";
                fetch(`http://localhost:3000/${loginEndpoint}`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    username: username,
                    password: password,
                  }),
                }).then((res) =>
                  res.json().then((data) => {
                    localStorage.setItem("token", data.token);
                    console.log(data.token);

                     window.location = "/";
                  })
                );
                alert("Sign Up Successful!");
              }
            }
              
          
              }}
          >
            Sign Up
          </Button>
        </Card>
        </ThemeProvider>
      </div>
    </div>
  );
}

function Toggle() {
  const [userType, setUserType] = useRecoilState(userTypeState);
  return (
    <div style={{ marginBottom: 15 }}>
      <ToggleButtonGroup
        color="secondary"
        value={userType}
        exclusive
        onChange={(event, newUserType) => {
          if (newUserType != null) setUserType(newUserType);
        }}
      >
        <ToggleButton value="user">User</ToggleButton>
        <ToggleButton value="admin">Admin</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

export default signup;
