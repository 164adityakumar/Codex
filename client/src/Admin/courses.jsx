import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../Pallete";
import { useRecoilState } from "recoil";
import { userTypeState } from "../usertype";
import { UserHandleState } from "../Appbar";
function Courses() {
  const [courses, setCourses] = useState([]);
  const [userhandle] = useRecoilState(UserHandleState);
  console.log(userhandle);
  useEffect(() => {
    console.log("userhandle:", userhandle); // Log the userhandle

    fetch(
      `https://codexbackend.onrender.com/admin/courses/author/${userhandle}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          console.log("Error status:", res.status); // Log the status code
        }
        return res.json();
      })
      .then((data) => {
        console.log("data:", data); // Log the data from the server
        setCourses(data.courses);
      });
  }, [userhandle]);
  // console.log(courses);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 20,
      }}
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
        style={{ maxwidth: 400, maxHeight: 200, marginBottom: -70 }}
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
            marginTop: "60",
            marginLeft: "auto",
          }}
        >
          <ThemeProvider theme={theme}>
            <IconButton
              variant="contained"
              aria-label="edit"
              color="secondary"
              size="larger"
              style={{
                backgroundColor: "#FFFFFF",
                border: "2px solid #1a73e9",
              }}
              onClick={() => {
                navigate("/course/" + course._id);
              }}
            >
              <EditIcon />
            </IconButton>
          </ThemeProvider>
        </div>
        <div
          style={{
            marginTop: "15px",
          }}
        >
          <Typography textAlign={"left"} variant="h5">
            {course.title}
          </Typography>
          <div
            style={{
              overflow: "auto",
              maxHeight: 100,
            }}
          >
            <Typography textAlign={"left"} variant="subtitle1">
              {course.description}
            </Typography>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Courses;
