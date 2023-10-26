import { Card, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";

function signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          Welcome back to edX CS50 by Aditya Kumar.
          <br />
          Sign in below.
        </Typography>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          variant={"outlined"}
          style={{
            width: 400,
            padding: 20,
          }}
          fontFamily={"monospace"}
        >
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
              setPassword(p.target.value);
            }}
          />
          <br />
          <br />
          <Button
            size={"large"}
            variant="outlined"
            onClick={() => {
              if (username.length === 0 || password.length === 0) {
                alert("Username or Password cannot be empty.");
              } else {
                fetch("http://localhost:3000/admin/login", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    username: username,
                    password: password,
                  }),
                }).then((res) => {
                  res.json().then(({message,token}) => {
                    localStorage.setItem("token", token);
                    console.log(message);
                     window.location = "/";
                  })}
                );
                alert("Sign In Successful!");
              }
            }}
          >
            Sign in
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default signin;
