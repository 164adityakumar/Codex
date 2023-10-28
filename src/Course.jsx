import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Grid from "@mui/material/Grid";


function Course() {
  const [course, setCourse] = useState(null);
  const { courseid } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/course/" + courseid, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCourse(res.data.course);
      });
  }, []);

  // let course = null;
  // for (let i = 0; i < courses.length; i++) {
  // if (courses[i]._id == courseid) course = courses[i];
  // }

  if (!course) {
    return (
      <div>
        <Typography variant="body1" color="initial" fontFamily={"monospace"}>
          Loading...
        </Typography>
      </div>
    );
  }
  return (
    <div>
      <GrayTopper title={course.title} />
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <Updatecourse course={course} setCourse={setCourse} />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <Coursettable course={course} />
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
        background: "#212121",
        top: 0,
        width: "100vw",
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
        }}
      >
        <div>
          <Typography
            style={{ color: "white", fontWeight: 600 }}
            variant="h3"
            textAlign={"center"}
          >
            {title}
          </Typography>
        </div>
      </div>
    </div>
  );
}
function Coursettable(props) {
  const course=props.course;
  return (
    <div
      style={{
        display: "flex",
        marginTop: 50,
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Card
        style={{
          margin: 10,
          width: 350,
          minHeight: 200,
          borderRadius: 20,
          marginRight: 50,
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

function Updatecourse({course, setCourse}) {
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [image, setImage] = useState(course.imageLink);
  const [price, setPrice] = useState(course.price);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card varint={"outlined"} style={{ maxWidth: 600, marginTop: 200 }}>
          <div style={{ padding: 20 }}>
            <Typography variant="h6" color="initial" fontFamily={"monospace"}>
              Edit your course details below.
            </Typography>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              variant={"outlined"}
              size={"large"}
              style={{
                width: 400,
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
              <Button
                size={"large"}
                variant="contained"
                onClick={() => {
                  if (title.length === 0 || description.length === 0) {
                    alert("Course Title or Description cannot be empty.");
                  } else {
                    fetch("http://localhost:3000/admin/courses/" + course._id, {
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
                      }),
                    }).then((res) =>
                      res.json().then((data) => {
                        let updatedCourse = {
                          _id: course._id,
                          title: title,
                          description: description,
                          imageLink: image,
                          price: price,
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
    </>
  );
}

export default Course;
