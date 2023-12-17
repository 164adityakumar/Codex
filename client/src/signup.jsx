import { Card, ToggleButtonGroup, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userTypeState } from "./usertype";
import ToggleButton from "@mui/material/ToggleButton";
import { theme } from "./Pallete";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
function signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userhandle, setUserhandle] = useState("");
  const [links, setLinks] = useState("");
  const [userType] = useRecoilState(userTypeState);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "",
        flexWrap: "wrap",
        padding: "2vh",
        height: "83vh",
        // alignContent: "center",
        // justifyItems: "between",
        // justifyContent: "between",
        // alignItems: "center",/
      }}
    >
      <Box
        style={{
          marginTop: "2vh",
          padding: 20,
          // marginBottom: 10,
          // display: "flex",
          paddingTop: "30vh",
          width: "50%",
          alignItems: "center",
          textAlign: "center",
          background:
            "linear-gradient(132deg, rgba(255, 255, 255, 0.206) 0%, rgba(238, 238, 238, 0.168) 20%, rgba(202, 202, 202, 0.148) 70%, rgba(171, 171, 171, 0.024) 100%)",
          border: "solid rgba(255, 255, 255, 0.06) 1px",
          borderRadius: "15px",
          // justifyContent: "center",
        }}
      >
        <Typography variant="h3" color="white" fontFamily={"Poppins"}>
          Welcome to
          <span style={{
            fontFamily: "Righteous",
          }}>{" "}Codex</span>
          <br />
          Dive in to learn
        </Typography>
      </Box>

      <div
        style={{
          marginTop: "1vh",
          // padding: 20,
          // marginBottom: 10,
          // display: "flex",
          // paddingTop: "30vh",
          width: "40%",
          alignItems: "center",
          // border: "solid rgba(255, 255, 255, 0.06) 1px",
        }}
      >
        <ThemeProvider theme={theme}>
          <Box
            style={{
              padding: "3vh",
              background:
                "linear-gradient(132deg, rgba(255, 255, 255, 0.206) 0%, rgba(238, 238, 238, 0.168) 20%, rgba(202, 202, 202, 0.148) 70%, rgba(171, 171, 171, 0.024) 100%)",
              border: "solid rgba(255, 255, 255, 0.06) 1px",
              borderRadius: "15px",
              alignItems: "center",
              display: "flex",
              height: "92%",
              flexDirection: "column",
            }}
          >
            <Card
              variant={"contained"}
              style={{
                width: "90%",
                padding: 20,
                height: "90%",
                backgroundColor: "#f1f5fece",
                // contrastText: "#beb9c3",

                // contrastText: "#beb9c3",
              }}
            >
              <Toggle />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
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
              </div>
              <br />
              <Button
                size={"large"}
                variant="outlined"
                color="secondary"
                onClick={() => {
                  if (
                    username.length === 0 ||
                    password.length === 0 ||
                    userhandle.length === 0 ||
                    links.length === 0
                  ) {
                    alert("All fields are required");
                  } else {
                    const loginEndpoint =
                      userType === "user" ? "user/signup" : "admin/signup";
                    console.log(loginEndpoint);
                    fetch(
                      `https://codexbackend.onrender.com/${loginEndpoint}`,
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          userhandle: userhandle,
                          username: username,
                          password: password,
                          Links: links,
                        }),
                      }
                    ).then((res) =>
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
          </Box>
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
