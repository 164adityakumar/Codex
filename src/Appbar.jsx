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
  // return (<img src={svgURI} alt={username} {...props} />)
  return (
    <Chip
      style={{
        marginRight: "10px",
      }}
      avatar={<Avatar alt={username} src={svgURI} {...props} />}
      label={username}
      variant="outlined"
      size="larger"
    />
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

  if (userEmail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "7px",
          backgroundColor: "#EDF2F6",
          // position: "static",
          // position: "-webkit-sticky",
          position: "sticky",
          top: 0,
          borderBottom: "solid 5px ##ff6d7f",
        }}
      >
        <div
          style={{
            marginLeft: "10px",
          }}
        >
          <Typography
            variant="h5"
            color="inherit"
            fontFamily={"monospace"}
            fontWeight={"600"}
          >
            Inkspace
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginRight: "10px",
          }}
        >
          <div style={{ marginRight: 10 }}>
            <Button
              color="inherit"
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
              color="inherit"
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
              border: "solid 1px #00000077",
            }}
            username={userEmail}
            saturation="85"
            lightness="40"
            width="150"
            height="150"
          />
          <div>
            <Button
              variant="outlined"
              style={{ borderRadius: "20px", border: "solid 1px #00000077" }}
              color="inherit"
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
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "7px",
          backgroundColor: "#EDF2F6",
          borderBottom: "solid 5px ##ff6d7f",
        }}
      >
        <div
          style={{
            marginLeft: "10px",
          }}
        >
          <Typography
            variant="h5"
            color="initial"
            fontFamily={"monospace"}
            fontWeight={"600"}
          >
            Inkspace
          </Typography>
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
                variant="outlined"
                size="larger"
                color="primary"
                style={{
                  borderRadius: "20px",
                  border: "solid 1.5px ",
                  fontWeight: "bold",
                  fontSize: "14px",
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
                variant="outlined"
                size="larger"
                color="secondary"
                style={{
                  borderRadius: "20px",
                  border: "solid 1.5px ",
                  // borderColor: "#206763",
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
