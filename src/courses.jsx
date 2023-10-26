import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    function callback2(data) {
      setCourses(data.courses);
    }
    function callback1(res) {
      res.json().then(callback2);
    }
    fetch("http://localhost:3000/admin/courses", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(callback1);
  }, []);

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {courses.map((course) => {
        return <Course key={course.id} course={course} />;
      })}
    </div>
  );
}

function Course({course}) {
      const navigate = useNavigate();
  return (
    <Card
      style={{
        margin: "10px",
        width: 400,
        minHeight: 200,
        // padding: 10,
        borderRadius: 10,
      }}
      variant="outlined"
    >
      <div
        style={{
          // padding: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 10,
          }}
        >
          <Typography textAlign={"left"} variant="h5" fontFamily="monospace">
            {course.title}
          </Typography>
          <Typography
            textAlign={"left"}
            variant="subtitle1"
            fontFamily="monospace"
          >
            {course.description}
          </Typography>
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                navigate("/course/" + course._id);
              }}
            >
              Edit
            </Button>
          </div>
        </div>
        <img
          src={course.imageLink}
          style={{
            width: 220,
            height: 200,
            alignContent: "right",
          }}
        ></img>
      </div>
    </Card>
  );
}

export default Courses;
