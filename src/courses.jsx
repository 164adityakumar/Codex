import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./Pallete";
function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    function callback2(data) {
      setCourses(data.courses);
    }
    function callback1(res) {
      res.json().then(callback2);
    }
    fetch("http://localhost:3000/admin/courses/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(callback1);
  }, []);

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20,backgroundColor:"#f2f2f2ce"}}
    >
      {courses.map((course) => {
        return <Course course={course} />;
      })}
    </div>
  );
}

export function Course({ course }) {
  const navigate = useNavigate();

  return (
    <Card
      style={{
        margin: 10,
        width: 350,
        minHeight: 200,
        borderRadius: 15,
      }}
    >
      <img
        src={course.imageLink}
        style={{ maxwidth: 400 ,maxHeight:200, marginBottom: -67 }}
      ></img>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 10,
        }}
      >
        <div
          style={{
            padding: "5px", // Adjust padding as needed
            marginTop: "65",
          }}
        >
          <ThemeProvider theme={theme}>
          <IconButton
            variant="contained"
            aria-label="edit"
            color="error"
            size="larger"
            style={{backgroundColor: "#FFFFFF"}}
            onClick={() => {
              navigate("/course/" + course._id);
            }}
          >
            <EditIcon />
          </IconButton>
          </ThemeProvider>
        </div>
        <div style={{
          marginTop: "15px",
        }}>
          <Typography textAlign={"center"} variant="h5">
            {course.title}
          </Typography>
          <Typography textAlign={"center"} variant="subtitle1">
            {course.description}
          </Typography>
        </div>
      </div>
    </Card>
  );
}

export default Courses;
