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
  const [userhandle, setUserhandle] = useState("");
  const [links, setLinks] = useState("");
  const [userType] = useRecoilState(userTypeState);
  return (
    <div>
      <div
        style={{
          marginTop: 40,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      ></div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ThemeProvider theme={theme}>
          <Card
            variant={"contained"}
            style={{
              width: 400,
              padding: 20,
              backgroundColor: "#f1f5fece",
              // contrastText: "#beb9c3",
            }}
          >
            <Toggle />
            <TextField
              fullWidth
              label="Userhandle"
              required={true}
              variant="filled"
              // sx={{ input:{color:""}}}
              onChange={(h) => {
                setUserhandle(h.target.value);
              }}
            />
            <br />
            <br />
            <TextField
              fullWidth
              label="Email"
              required={true}
              variant="filled"
              // sx={{ input:{color:""}}}
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
              required={true}
              onChange={(p) => {
                console.log(p);
                setPassword(p.target.value);
              }}
            />
            <br />
            <br />
            <TextField
              fullWidth
              label="Social Link"
              variant="filled"
              required={true}
              onChange={(q) => {
                console.log(q);
                setLinks(q.target.value);
              }}
            />
            <br />
            <br />
            <Button
              size={"large"}
              variant="outlined"
              color="secondary"
              onClick={() => {
                if (username.length === 0 || password.length === 0 || userhandle.length === 0 || links.length === 0) {
                  alert("All fields are required");
                } else {
                  const loginEndpoint =
                    userType === "user" ? "user/signup" : "admin/signup";
                  console.log(loginEndpoint);
                  fetch(`http://localhost:3000/${loginEndpoint}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      userhandle: userhandle,
                      username: username,
                      password: password,
                      Links: links,
                    }),
                  }).then((res) =>
                    res.json().then((data) => {
                      localStorage.setItem("token", data.token);
                      localStorage.setItem("UserType", userType);
                      console.log(data.token);

                      window.location = "/";
                    })
                  );
                  alert("Sign Up Successful!");
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
