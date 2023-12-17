import { UserState } from "./MeState";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { Grid } from "@mui/material";
import { Card } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { CardMedia } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { atom } from "recoil";
import { Loader } from "../Loader";
import { useState } from "react";

function MyCourses() {
  const [user, setUser] = useRecoilState(UserState);
  const [courses, setCourses] = useRecoilState(coursesState);
  const [PurchasedCourses, setPurchasedCourses] = useState([]);

  console.log(user);
  useEffect(() => {
    function callback2(data) {
      setCourses(data.courses);
    }
    function callback1(res) {
      res.json().then(callback2);
    }
    fetch("https://codexbackend.onrender.com/user/courses/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(callback1);
  }, []);

  useEffect(() => {
    fetch(`https://codexbackend.onrender.com/user/me`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setPurchasedCourses(
          courses.filter((c) => data.purchasedCourses.includes(c._id))
        );
        console.log(data);
      });
  }, [courses]);

  console.log(PurchasedCourses);

  if (!PurchasedCourses) {
    return <div> You have not purchased any courses</div>;
  }
  return (
    <div>
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        {PurchasedCourses.map((course) => {
          return <Course course={course} />;
        })}
      </Grid>
      {/* </Box> */}
    </div>
  );
}

export function Course({ course }) {
  const navigate = useNavigate();
  const tagsarray = course.tags;
  return (
    <div className="box">
      <Card
        style={{
          margin: 40,
          // marginInline: 40,
          // marginRight: 60,
          width: 350,
          minHeight: 200,
          maxHeight: 500,
          borderRadius: 15,
          backgroundColor: "#2e3339b1",
        }}
        onClick={() => {
          window.location = "/Explore/" + course._id;
          //here i needed Window change because it was not working with navigate as IsPurchased was not getting updated in time
        }}
        className="courseCard"
      >
        <CardActionArea>
          <CardMedia
            component="img"
            style={{
              maxwidth: 250,
              maxHeight: 200,
              borderBottom: "solid 3px #ff6d7e9c",
            }}
            image={course.imageLink}
            alt="Thumbnail"
          />
          <CardContent>
            <Typography
              textAlign={"left"}
              style={{
                // marginBottom: "3px",
                textAlign: "justify",
                marginTop: "-10px",
                marginBottom: "10px",
              }}
              variant="h6"
              color={"#488de9"}
              fontFamily={"Lato"}
            >
              <b>{course.title}</b>
              {/* <div
                className="blink"
                style={{
                  color: "#ff6d7f",
                  fontSize: "25px",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                }}
              >
                {"_"}
              </div> */}
            </Typography>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "15px",
              }}
            >
              <Typography textAlign={"left"} variant="body2" color={"GrayText"}>
                <b>{course.author}</b>
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "5px",
                  flexWrap: "wrap",
                }}
              ></div>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
const coursesState = atom({
  key: "courses",
  default: [],
});
export default MyCourses;
