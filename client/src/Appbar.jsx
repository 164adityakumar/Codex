import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { minidenticon } from "minidenticons";
import { useMemo } from "react";
import { Chip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./Pallete";
import { assets } from "./assests";
import { useRecoilState } from "recoil";
import { atom } from "recoil";
import Signin from "./signin";
import { Loader } from "./Loader";

export const MinidenticonImg = ({
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
            // padding: "2px 5px 2px 5px",
            fontFamily: "Josefin Sans",
            border: "solid 1.9px #8cbefa85",
            backgroundColor: "#0073ffdc",
            // fontSize:"13px"
          }}
          avatar={<Avatar alt={username} src={svgURI} {...props} />}
          label={username}
          variant="contained"
          size="medium"
          color="secondary"
        />
    </ThemeProvider>
  );
};
function Appbar() {
  const usertypetoken = localStorage.getItem("UserType");
  const navigate = useNavigate();
  const [UserHandle, setUserHandle] = useRecoilState(UserHandleState);
  // const [userType] = useRecoilState(userTypeState);
  const [isLoading, setIsLoading] = useState(true); // Add this line

  const [openSignIn, setOpenSignIn] = useRecoilState(OpenSigninState);

  const handleOpenSignIn = () => {
    setOpenSignIn(true);
  };

  const handleCloseSignIn = () => {
    setOpenSignIn(false);
  };

  useEffect(() => {
    setIsLoading(true); // Set loading to true when starting the fetch

    console.log(localStorage.getItem("token"));
    const meEndpoint = usertypetoken === "user" ? "user/me" : "admin/me";
    fetch(`https://codexbackend.onrender.com/${meEndpoint}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserHandle(data.userhandle);
        console.log(data.userhandle);
        setIsLoading(false); // Set loading to false when the fetch is done
      });
  }, [UserHandle]);  
  

  if (UserHandle) {
    if (usertypetoken === "admin") {
      console.log(UserHandle);
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px",
            backgroundColor: "#0f1e2b",
            // position: "static",
            zIndex: 100,
            // position: "-webkit-sticky",
            position: "sticky",
            top: 0,
            borderBottom: "solid 5px ##ff6d7f",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center", // Align items vertically
              marginLeft: "3px",
            }}
          >
            <a href="/">
              <img
                style={{
                  width: "40px", // Adjust as needed
                  height: "40px", // Adjust as needed
                }}
                src={assets.logo}
                alt="logo"
              />
            </a>
            <a href="/" style={{ textDecoration: "none" }}>
              <ThemeProvider theme={theme}>
                <Typography
                  variant="h5"
                  color="primary"
                  style={{ fontWeight: 500, fontSize: "27px" }}
                >
                  Codex_
                </Typography>
              </ThemeProvider>
            </a>
          </div>
          <ThemeProvider theme={theme}>
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginRight: "10px",
                alignItems: "center",
              }}
            >
              <div style={{ marginRight: 10 }}>
                <Button
                  color="primary"
                  size="medium"
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
                  size="medium"
                  style={{ borderRadius: "20px" }}
                  onClick={() => {
                    navigate("/courses");
                  }}
                >
                  Courses
                </Button>
              </div>
              {/* <Typography fontFamily={"monospace"}>{UserHandle}</Typography> */}
              <a href="/ProfileAdmin" onClick={() => navigate("/ProfileAdmin")}>
                <MinidenticonImg
                  style={{
                    backgroundColor: "#1a326a",
                    border: "solid 0px #0b438b",
                    width: "25px",
                    height: "23px",
                  }}
                  username={UserHandle}
                  saturation="85"
                  lightness="40"
                />
              </a>

              <div>
                <Button
                  variant="outlined"
                  style={{ borderRadius: "20px" }}
                  color="error"
                  size="medium"
                  onClick={() => {
                    localStorage.setItem("token", null);
                    localStorage.setItem("UserType", null);
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
            // position: "static",
            // position: "-webkit-sticky",
            position: "sticky",
            scrollBehavior: "smooth",
            top: 0,
            zIndex: 100,
            borderBottom: "solid 5px ##ff6d7f",
          }}
        >
          <div
            style={{
              marginLeft: "3px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center", // Align items vertically
              }}
            >
              <a href="/">
                <img
                  style={{
                    width: "40px", // Adjust as needed
                    height: "40px", // Adjust as needed
                  }}
                  src={assets.logo}
                  alt="logo"
                />
              </a>
              <a href="/" style={{ textDecoration: "none" }}>
                <ThemeProvider theme={theme}>
                  <Typography
                    variant="h5"
                    color="primary"
                    style={{ fontWeight: 500, fontSize: "27px" }}
                  >
                    Codex_
                  </Typography>
                </ThemeProvider>
              </a>
            </div>
          </div>
          <ThemeProvider theme={theme}>
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginRight: "10px",
                alignItems: "center",
              }}
            >
              <div style={{ marginRight: 10 }}>
                <Button
                  color="secondary"
                  variant="contained"
                  size="medium"
                  style={{ borderRadius: "20px" }}
                  onClick={() => {
                    navigate("/Explore");
                  }}
                >
                  Explore
                </Button>
              </div>
              <div style={{ marginRight: 10 }}>
                <Button
                  color="primary"
                  size="medium"
                  style={{ borderRadius: "20px" }}
                  onClick={() => {
                    navigate("/MyCourses");
                  }}
                >
                  My Courses
                </Button>
              </div>
              {/* <Typography fontFamily={"monospace"}>{UserHandle}</Typography> */}
              <a href="/Profile" onClick={() => navigate("/Profile")}>
                <MinidenticonImg
                  style={{
                    backgroundColor: "#1a326a",
                    // border: "solid 1.7px #5394e4ad",
                    width: "24px",
                    height: "23px",
                    // padding:"0.5px"
                  }}
                  username={UserHandle}
                  saturation="85"
                  lightness="40"
                  // width="150"
                  // height="150"
                />
              </a>
              <div>
                <Button
                  variant="outlined"
                  style={{ borderRadius: "20px" }}
                  color="error"
                  size="medium"
                  onClick={() => {
                    localStorage.setItem("token", null);
                    localStorage.setItem("UserType", null);
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
    }
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
          zIndex: 100,
          // position: "-webkit-sticky",
          position: "sticky",
          top: 0,
        }}
      >
        <div
          style={{
            marginLeft: "3px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center", // Align items vertically
            }}
          >
            <a href="/">
              <img
                style={{
                  width: "40px", // Adjust as needed
                  height: "40px", // Adjust as needed
                }}
                src={assets.logo}
                alt="logo"
              />
            </a>
            <a href="/" style={{ textDecoration: "none" }}>
              <ThemeProvider theme={theme}>
                <Typography
                  variant="h5"
                  color="primary"
                  style={{ fontWeight: 500, fontSize: "27px" }}
                >
                  Codex_
                </Typography>
              </ThemeProvider>
            </a>
          </div>
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
                onClick={handleOpenSignIn}
              >
                Sign In
              </Button>
              <Signin />
            </div>
            <div>
              <Button
                variant="contained"
                size="larger"
                color="secondary"
                style={{
                  borderRadius: "20px",
                  border: "solid 2.5px #ff6d7f",
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

export const UserHandleState = atom({
  key: "UserHandle",
  default: null,
});

export const OpenSigninState = atom({
  key: "OpenSignin",
  default: false,
});
export default Appbar;
