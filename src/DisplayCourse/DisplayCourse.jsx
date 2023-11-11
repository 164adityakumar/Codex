import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Loader } from "../Loader";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { theme } from "../Pallete";
import { atom, useRecoilState } from "recoil";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { CourseContent } from "./CourseContent";
import { Instructor } from "./Instructor";
import { useNavigate } from "react-router-dom";
function Course() {
  const [course, setCourse] = useRecoilState(courseState);
  const { courseid } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3000/user/courses/" + courseid, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCourse(res.data.course);
      });
  }, []);

  if (!course) {
    return <Loader />;
  }
  return (
    <div>
      <Coursettable />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <div>
          <CourseContent />
        </div>
        <div>
          <Instructor />
        </div>
      </div>
    </div>
  );
}

function Coursettable() {
  const navigate = useNavigate();
  const [course] = useRecoilState(courseState);

  return (
    <div
      style={{
        display: "flex",
        marginTop: 10,
        justifyContent: "center",
        width: "100%",
        marginRight: 50,
      }}
    >
      <Card
        style={{
          margin: 10,
          width: "100%",
          minHeight: 200,
          borderRadius: 20,
          // marginRight: 50,
          padding: 10,
          // zIndex: 2,
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: 10,
          backgroundColor: "#2e3339b1",
          border: "3px solid #ff6d7e9c",
        }}
      >
        <ThemeProvider theme={theme}>
          <div>
            <img
              src={course.imageLink}
              style={{ width: "30vw", borderRadius: 10 }}
            ></img>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "justify",
              gap: 10,
              padding: 10,
              flexGrow: 1,
              width:"60vw",
              height:"auto"
            }}
          >
            <Typography
              variant="h5"
              fontFamily={"monospace"}
              color={"#ff6d7e"}
              style={{ fontWeight: 600 }}
            >
              {course.title}
            </Typography>
            <Typography
              variant="subtitle1"
              style={{
                color: "#ff6d7e",
                fontSize: "200",
                fontFamily: "Monospace",
              }}
            >
              {course.description}
            </Typography>
            <div
              style={{
                marginTop: "auto",
                display: "flex",
                flex: "row",
                alignItems: "center",
                gap: "auto",
              }}
            >
              <Typography
                variant="subtitle1"
                fontFamily={"Monospace"}
                style={{ color: "#ff6d7e", alignContent: "flex-end" }}
              >
                <b> Price: Rs {course.price} </b>
              </Typography>
              <div
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  flexDirection: "row",
                  // justifyContent:"center",
                  alignContent: "flex-end",
                  gap: 10,
                }}
              >
                <Button variant="contained" color="warning" style={{}}
                onClick={()=>{
                  navigate(`${location.pathname}/Purchase`)
                }}>
                  Enroll Now
                </Button>
                <Button variant="contained" color="secondary" style={{}}>
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </Card>
    </div>
  );
}
export function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1.5 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
export function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const courseState = atom({
  key: "courseState",
  default: null,
});

export default Course;
