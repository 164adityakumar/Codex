import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Avatar,
  Paper,
  Grid,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { Edit, Save } from "@mui/icons-material";
import axios from "axios";
import { minidenticon } from "minidenticons";
import { useMemo } from "react";
import { Loader } from "../Loader";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  GitHub,
  YouTube,
} from "@mui/icons-material";

function getSocialMediaIcon(link) {
  if (!link) {
    return null;
  }
  if (link.includes("facebook")) {
    return (
      <Facebook
        color="primary"
        style={{
          width: "40px",
          height: "40px",
        }}
      />
    );
  } else if (link.includes("twitter")) {
    return (
      <Twitter
        color={"primary"}
        style={{
          width: "40px",
          height: "40px",
        }}
      />
    );
  } else if (link.includes("instagram")) {
    return (
      <Instagram
        color={"primary"}
        style={{
          width: "40px",
          height: "40px",
        }}
      />
    );
  } else if (link.includes("linkedin")) {
    return (
      <LinkedIn
        color={"primary"}
        style={{
          width: "40px",
          height: "40px",
        }}
      />
    );
  } else if (link.includes("github")) {
    return (
      <GitHub
        color={"primary"}
        style={{
          width: "40px",
          height: "40px",
        }}
      />
    );
  } else if (link.includes("youtube")) {
    return (
      <YouTube
        color={"primary"}
        style={{
          width: "40px",
          height: "40px",
        }}
      />
    );
  } else {
    return null;
  }
}

const MinidenticonImg = ({ username, saturation, lightness, ...props }) => {
  const svgURI = useMemo(
    () =>
      "data:image/svg+xml;utf8," +
      encodeURIComponent(minidenticon(username, saturation, lightness)),
    [username, saturation, lightness]
  );
  return (
    <>
      <Avatar alt={username} src={svgURI} {...props} />
    </>
  );
};
function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    console.log(localStorage.getItem("token"));
    fetch(`http://localhost:3000/admin/me`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        console.log(data);
      });
  }, []);
  const handleEdit = () => {
    setIsEditing(!isEditing);

    if (isEditing) {
      fetch(`http://localhost:3000/admin/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          console.log(data);
        });
    }
  };

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  if (user.userhandle == undefined) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "justify",
        // justifyContent: "center",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        gap: 5,
        //   bgcolor: "background.default",
        p: 3,
      }}
    >
      <div>
        <div style={{ marginTop: "20px" }} />
        {/* <Avatar sx={{ width: 250, height: 250 }}>U</Avatar> */}
        <MinidenticonImg
          style={{
            backgroundColor: "#112450",
            border: "solid 3px #ff6d7f",
            width: 250,
            height: 250,
          }}
          saturation="85"
          lightness="40"
          username={user.userhandle}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isEditing ? (
          <Paper
            elevation={3}
            variant="outlined"
            sx={{
              p: 3,
              mt: 3,
              width: "60vw",
              minHeight: "65vh",
              backgroundColor: "#111b2cd6",
              border: "solid 1.7px #124397bb",
              color: "#fff",
              fullWidth: true,
              // display: "flex",
              // flexDirection: "column",
              // gap: 3,
              // justifyItems: "justify",
            }}
          >
            <TextField
              name="userhandle"
              label="userhandle"
              value={user.userhandle}
              onChange={handleChange}
              fullWidth
              variant="filled"
              InputProps={{
                style: {
                  color: "#fff",
                  backgroundColor: "#04355f6e",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "#1e78c7",
                },
              }}
            />
            <TextField
              name="username"
              label="username"
              value={user.username}
              onChange={handleChange}
              fullWidth
              variant="filled"
              InputProps={{
                style: {
                  color: "#fff",
                  backgroundColor: "#04355f6e",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "#1e78c7",
                },
              }}
            />
            <TextField
              name="Links"
              label="Links"
              value={user.Links}
              onChange={handleChange}
              fullWidth
              variant="filled"
              InputProps={{
                style: {
                  color: "#fff",
                  backgroundColor: "#04355f6e",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "#1e78c7",
                },
              }}
            />
            <TextField
              name="bio"
              label="bio"
              margin="normal"
              value={user.bio}
              onChange={handleChange}
              fullWidth
              variant="filled"
              multiline
              rows={4}
              InputProps={{
                style: {
                  color: "#fff",
                  backgroundColor: "#04355f6e",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "#1e78c7",
                },
              }}
            />
            <Button
              startIcon={<Save />}
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={handleEdit}
            >
              Save
            </Button>
          </Paper>
        ) : (
          <>
            <Paper
              elevation={0}
              variant="outlined"
              sx={{
                p: 3,
                mt: 3,
                width: "60vw",
                minHeight: "65vh",
                backgroundColor: "#111b2cd6",
                border: "solid 1.7px #124397bb",
                color: "#fff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  justifyItems: "center",
                  marginLeft: 5.8,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 20,
                    width: "100%",
                  }}
                >
                  <div>
                    <Typography
                      variant="h4"
                      fontFamily={"monospace"}
                      color={"#ff6d7f"}
                    >
                      {user.userhandle}
                    </Typography>
                  </div>
                  <div>
                    <a
                      href={user.Links}
                      target={user.Links}
                      rel="noopener noreferrer"
                    >
                      {user && user.Links && getSocialMediaIcon(user.Links)}
                    </a>
                  </div>
                </div>

                <Typography variant="subtitle1" fontFamily={"monospace"}>
                  {user.username}
                </Typography>

                <Typography
                  variant="subtitle1"
                  fontFamily={"monospace"}
                  style={{
                    fontSize: "1.2rem",
                  }}
                >
                  <br />
                </Typography>
                <Box
                  style={{
                    width: "auto",
                    height: "30vh",
                    // justifyContent: "center",
                    alignContent: "space-evenly",
                    backgroundColor: "#003b7b3a",
                    color: "#eeaab2",
                    border: "solid 1.7px #124397bb",
                    overflow: "auto",
                    borderRadius: "7px",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontFamily={"monospace"}
                    style={{
                      marginLeft: "0.8rem",
                      marginTop: "0.8rem",
                    }}
                  >
                    {user.bio}
                  </Typography>
                </Box>
              </div>

              <Button
                startIcon={<Edit />}
                variant="outlined"
                sx={{ mt: 2, ml: 0.8 }}
                onClick={handleEdit}
              >
                Edit Profile
              </Button>
            </Paper>
          </>
        )}
      </div>
    </Box>
  );
}

export default AdminProfile;
