import  { useEffect, useState } from "react";
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
import { Loader } from "./Loader";



const MinidenticonImg = ({
  username,
  saturation,
  lightness,
  ...props
}) => {
  const svgURI = useMemo(
    () =>
      "data:image/svg+xml;utf8," +
      encodeURIComponent(minidenticon(username, saturation, lightness)),
    [username, saturation, lightness]
  );
  return (<>
        <Avatar alt={username} src={svgURI} {...props} />
        </>
  );
};
function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({});
 useEffect(() => {
   console.log(localStorage.getItem("token"));
   fetch(`http://localhost:3000/user/me`, {
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
  };

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  if(user.userhandle==undefined){
    return(
      <div>
        <Loader/>   
      </div>
    )
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
              name="username"
              label="Username"
              value={user.userhandle}
              onChange={handleChange}
              fullWidth
              margin="normal"
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
              name="email"
              margin="normal"
              label="Email"
              value={user.email}
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
              name="location"
              margin="normal"
              label="Location"
              value={user.location}
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
              name="joined"
              margin="normal"
              label="Joined"
              value={user.joined}
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
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                justifyItems: "center",
              }}>
                <Typography variant="h4" fontFamily={"monospace"}>
                  {user.userhandle}
                </Typography>
                <Typography variant="body1" fontFamily={"monospace"}>
                  Email:{user.email}
                </Typography>
                <Typography variant="body1" fontFamily={"monospace"}>
                  Location: {user.location}
                </Typography>
                <Typography variant="body1" fontFamily={"monospace"}>
                  Joined: {user.joined}
                </Typography>
              </div>

              <Button
                startIcon={<Edit />}
                variant="outlined"
                sx={{ mt: 2 }}
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

export default UserProfile;
