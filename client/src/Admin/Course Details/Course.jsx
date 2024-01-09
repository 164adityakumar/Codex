import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Input } from "@mui/material";
import { Loader } from "../../Loader";
import { atom, useRecoilState } from "recoil";
import Autocomplete from "@mui/material/Autocomplete";
import { VideoDisplay } from "./VideoDisplay";

function Course() {
  const [course, setCourse] = useState(null);
  const { courseid } = useParams();
  const [videos, setVideos] = useRecoilState(videoState);
  useEffect(() => {
    axios
      .get("https://codexbackend.onrender.com/admin/course/" + courseid, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCourse(res.data.course);
        setVideos(res.data.course.videos); // Set the videos state
      });
  }, []);
  if (!course) {
    return (
      <div>
        <Typography variant="body1" color="initial" fontFamily={"monospace"}>
          <Loader />
        </Typography>
      </div>
    );
  }
  return (
    <div
      style={
        {
          // backgroundColor: "#fffeff9b"
        }
      }
    >
      <GrayTopper title={course.title} />
      <Grid container>
        <Grid item lg={4} md={5} sm={12}>
          <Coursettable course={course} />
        </Grid>
        <Grid item lg={12} md={12} sm={12}>
          <div
            style={{
              // display: "flex",
              // flexDirection: "row",
              // justifyContent: "center",
              // alignItems: "center",
              borderTop: "solid rgba(255, 255, 255, 0.06) 3px", // width: "100vw",
              paddingTop: 45,
              marginTop: 30,
            }}
          >
            <Grid container spacing={0}>
              <Grid item lg={7} md={7} sm={12}>
                <Updatecourse course={course} setCourse={setCourse} />
              </Grid>
              <Grid item lg={5} md={5} sm={12}>
                <VideoDisplay course={course} />
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
function GrayTopper({ title }) {
  return (
    <div
      style={{
        height: 250,
        background:
          "linear-gradient(132deg, rgba(255, 255, 255, 0.206) 0%, rgba(238, 238, 238, 0.168) 20%, rgba(202, 202, 202, 0.148) 70%, rgba(171, 171, 171, 0.024) 100%)",
        border: "solid rgba(255, 255, 255, 0.06) 1px", // width: "100vw",
        zIndex: 0,
        marginBottom: -250,
      }}
    >
      <div
        style={{
          height: 250,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          position: "relative",
          marginLeft: 90,
        }}
      >
        <div>
          <Typography
            style={{ color: "white", fontWeight: 600 }}
            variant="h3"
            textAlign={"center"}
            fontFamily={"Poppins"}
          >
            Course Details
          </Typography>
        </div>
      </div>
    </div>
  );
}
function Coursettable(props) {
  const course = props.course;
  return (
    <div
      style={{
        display: "flex",
        marginTop: 50,
        justifyContent: "center",
        width: "90%",
      }}
    >
      <Card
        style={{
          margin: 10,
          width: 350,
          minHeight: 200,
          borderRadius: 20,
          // marginRight:-200 ,
          paddingBottom: 15,
          zIndex: 2,
        }}
      >
        <img src={course.imageLink} style={{ width: 350 }}></img>
        <div style={{ marginLeft: 10 }}>
          <Typography variant="h5">{course.title}</Typography>
          <Typography variant="subtitle2" style={{ color: "gray" }}>
            Price
          </Typography>
          <Typography variant="subtitle1">
            <b>Rs {course.price} </b>
          </Typography>
        </div>
      </Card>
    </div>
  );
}

function Updatecourse({ course, setCourse }) {
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [image, setImage] = useState(course.imageLink);
  const [price, setPrice] = useState(course.price);
  const [tags, setTags] = useState(course.tags);

  const [optiontags, setOptionTags] = useState([]);

  useEffect(() => {
    fetch("https://codexbackend.onrender.com/user/tags", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      res.json().then((data) => {
        console.log(data.tags);
        setOptionTags(data.tags);
      });
    });
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          // gap: 50,
        }}
      >
        <Card
          variant={"outlined"}
          style={{
            width: 500,
            // marginTop: 200,
            // marginLeft: 100,
            // maxHeight: 500,
          }}
        >
          <div style={{ padding: 20 }}>
            <Typography variant="h6" color="initial" fontFamily={"Poppins"}>
              Edit your course details below.
            </Typography>
          </div>

          <div
            style={{
              display: "flex",
              // justifyContent: "center",
              // flexDirection: "column",
            }}
          >
            <Card
              variant={"outlined"}
              size={"large"}
              style={{
                width: 450,
                padding: 20,
              }}
              fontFamily={"monospace"}
            >
              <TextField
                defaultValue={title}
                style={{ marginBottom: 10 }}
                onChange={(a) => {
                  setTitle(a.target.value);
                }}
                fullWidth={true}
                label="Title"
                variant="outlined"
              />
              <TextField
                defaultValue={description}
                style={{ marginBottom: 10 }}
                onChange={(b) => {
                  setDescription(b.target.value);
                }}
                fullWidth={true}
                label="Description"
                variant="outlined"
              />
              <TextField
                defaultValue={image}
                style={{ marginBottom: 10 }}
                onChange={(c) => {
                  setImage(c.target.value);
                }}
                fullWidth={true}
                label="Image link"
                variant="outlined"
              />
              <TextField
                defaultValue={price}
                style={{ marginBottom: 10 }}
                onChange={(d) => {
                  setPrice(d.target.value);
                }}
                fullWidth={true}
                label="Price"
                variant="outlined"
              />
              <Autocomplete
                multiple
                id="tags-filled"
                options={optiontags} // Change this line
                defaultValue={tags}
                freeSolo
                onChange={(event, value) => setTags(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Tags"
                    style={{ marginBottom: 10 }}
                    placeholder="Favorites"
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        setTags((oldTags) => [...oldTags, event.target.value]);
                      }
                    }}
                  />
                )}
              />
              <Button
                size={"large"}
                variant="contained"
                onClick={() => {
                  if (title.length === 0 || description.length === 0) {
                    alert("Course Title or Description cannot be empty.");
                  } else {
                    fetch(
                      "https://codexbackend.onrender.com/admin/courses/" +
                        course._id,
                      {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization:
                            "Bearer " + localStorage.getItem("token"), //this header is necessary to be senf using the header for the admin to be authenticated using the token stored in local storage until the admin signs out
                        },

                        body: JSON.stringify({
                          title: title,
                          description: description,
                          imageLink: image,
                          published: true,
                          price: price,
                          tags: tags,
                        }),
                      }
                    ).then((res) =>
                      res.json().then((data) => {
                        let updatedCourse = {
                          _id: course._id,
                          title: title,
                          description: description,
                          imageLink: image,
                          price: price,
                          tags: tags,
                        };
                        setCourse(updatedCourse);
                        alert("Course Updated Successfully!");
                      })
                    );
                  }
                }}
              >
                Update Course
              </Button>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
}

export const selectedVideoState = atom({
  key: "selectedVideoState",
  default: null,
});

export const videoState = atom({
  key: "videoState",
  default: [],
});

export default Course;
