import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { minidenticon } from "minidenticons";
import { useMemo } from "react";
import { Chip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useRecoilState } from "recoil";
import { userTypeState } from "./usertype";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./Pallete";
const MinidenticonImg = ({ username, saturation, lightness, ...props }) => {
  const svgURI = useMemo(
    () =>
      "data:image/svg+xml;utf8," +
      encodeURIComponent(minidenticon(username, saturation, lightness)),
    [username, saturation, lightness]
  );
 
//   const [userType] = useRecoilState(userTypeState);
//   useEffect(() => {
//   if(userType==="user"||userType===null) 
//   {}
//   else
//  {}
//   }, [userType]);
  // return (<img src={svgURI} alt={username} {...props} />)
  return (
    <ThemeProvider theme={theme}>
    <Chip
      style={{
        marginRight: "10px",
        fontWeight: "bold",
        // paddingInline: "5px",
        // paddingTop: "5px",
        // paddingBottom: "5px",
        fontFamily:"Josefin Sans",
        border: "solid 1.7px #1a73e9",
        // fontSize:"13px"
      }}
      avatar={<Avatar alt={username} src={svgURI} {...props} />}
      label={username}
      variant="contained"
      size="large"
      color="secondary"
      
    />
    </ThemeProvider>
  );
};
function Appbar() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);
  const [userType] = useRecoilState(userTypeState);
  useEffect(() => {
    console.log(localStorage.getItem("token"));
    const meEndpoint = userType === "user" ? "user/me" : "admin/me";
    fetch(`http://localhost:3000/${meEndpoint}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserEmail(data.username);
        console.log(data.username);
      });
  }, [userType, userEmail]);

  if (userEmail && userType === "admin") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px",
          backgroundColor: "#0f1e2b",
          // position: "static",
          // position: "-webkit-sticky",
          position: "sticky",
          top: 0,
          borderBottom: "solid 5px ##ff6d7f",
        }}
      >
        <ThemeProvider theme={theme}>
          <Typography
            variant="h5"
            color="primary"
            fontWeight={"500"}
            fontSize={"27px"}
          >
            Inkspace.
          </Typography>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginRight: "10px",
            }}
          >
            <div style={{ marginRight: 10 }}>
              <Button
                color="primary"
                style={{ borderRadius: "20px" }}
                onClick={() => {
                  navigate("/addcourse");
                }}
              >
                Add course
              </Button>
            </div>
            <div style={{ marginRight: 10 }}>
              <Button
                color="primary"
                style={{ borderRadius: "20px" }}
                onClick={() => {
                  navigate("/courses");
                }}
              >
                Courses
              </Button>
            </div>
            {/* <Typography fontFamily={"monospace"}>{userEmail}</Typography> */}
            <MinidenticonImg
              style={{
                backgroundColor: "#eeeeee",
                border: "solid 0px #0b438b",
                  width:"25px",
                  height:"23px"
              
              }}
              username={userEmail}
              saturation="85"
              lightness="40"
              // width="150"
              // height="150"
            />
            <div>
              <Button
                variant="outlined"
                style={{ borderRadius: "20px", border: "solid 1px " }}
                color="error"
                size="larger"
                onClick={() => {
                  localStorage.setItem("token", null);
                  window.location = "/";
                }}
              >
                Log Out
              </Button>
            </div>
          </div>
        </ThemeProvider>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px",
          backgroundColor: "#0f1e2b",
          borderBottom: "solid 5px #ff6d7f",
        }}
      >
        <div
          style={{
            marginLeft: "10px",
          }}
        >
          <ThemeProvider theme={theme}>
          <Typography
            variant="h5"
            color="primary"
            fontWeight={"500"}
            fontSize={"27px"}
          >
            Inkspace.
          </Typography>
          </ThemeProvider>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginRight: "10px",
          }}
        >
          <ThemeProvider theme={theme}>
            <div>
              <Button
                variant="text"
                size="larger"
                color="primary"
                style={{
                  borderRadius: "20px",
                  border: " 1.5px",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
                onClick={() => {
                  navigate("/signin");
                }}
              >
                Sign In
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                size="larger"
                color="secondary"
                style={{
                  borderRadius: "20px",
                  // border: "solid 2.5px #ff6d7f",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </Button>
            </div>
          </ThemeProvider>
        </div>
      </div>
    );
  }
}

export default Appbar;
