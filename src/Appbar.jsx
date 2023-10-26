import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Appbar() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    console.log(localStorage.getItem("token"));
    fetch("http://localhost:3000/admin/me", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserEmail(data.username);
        console.log(data.username);
      });
  }, []);

  if (userEmail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "7px",
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
            edX
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
              onClick={() => {
                navigate("/addcourse");
              }}
            >
              Add course
            </Button>
          </div>

          <div style={{ marginRight: 10 }}>
            <Button
              onClick={() => {
                navigate("/courses");
              }}
            >
              Courses
            </Button>
          </div>
          <Typography fontFamily={"monospace"}>{userEmail}</Typography>
          <div>
            <Button
              variant="outlined"
              size="small"
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
            edX
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginRight: "10px",
          }}
        >
          <div>
            <Button
              variant="outlined"
              size="small"
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
              size="small"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Appbar;
