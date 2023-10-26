import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Course() {
  const [courses, setCourses] = useState([]);
  const { courseid } = useParams();

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

  let course = null;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i]._id == courseid) course = courses[i];
  }

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
       <Card
      style={{
        marginLeft: "20px",
        marginRight: "20px",
        marginTop: "10px",
        // minHeight: 200,
        // padding: 10,
        borderRadius: 10,
      }}
      variant="outlined"
    >
      <Coursettable course={course} />
      <Updatecourse course={course} courses={courses} setCourses={setCourses}/>
    </Card>
    </div>
  );
}

function Coursettable(props) {
  return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <img
          src={props.course.imageLink}
          style={{
            width: 250,
            height: 300,
            alignContent: "left",
          }}
        ></img>
        <div>
          <Typography textAlign={"left"} variant="h5" fontFamily="monospace">
            {props.course.title}
          </Typography>
          <Typography
            textAlign={"left"}
            variant="subtitle1"
            fontFamily="monospace"
          >
            {props.course.description}
          </Typography>
        </div>
      </div>
  );
}

function Updatecourse(props) {
  const course=props.course
  const [title, setTitle] = useState("course.title");
  const [description, setDescription] = useState("course.description");
  const [image, setImage] = useState("course.imageLink");
  return (
    <>
      <div>
        <div
          style={{
            marginTop: 10,
            marginBottom: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
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
            style={{
              width: 400,
              padding: 20,
            }}
            fontFamily={"monospace"}
          >
            <TextField
              fullWidth
              label="Course Title"
              variant="outlined"
              onChange={(t) => {
                setTitle(t.target.value);
              }}
            />
            <br />
            <br />

            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              onChange={(d) => {
                setDescription(d.target.value);
              }}
            />
            <br />
            <br />

            <TextField
              fullWidth
              label="Image Link"
              variant="outlined"
              onChange={(image) => {
                setImage(image.target.value);
              }}
            />
            <br /> <br />
            <Button
              size={"large"}
              variant="contained"
              onClick={() => {
                if (title.length === 0 || description.length === 0) {
                  alert("Course Title or Description cannot be empty.");
                } else {
                  fetch("http://localhost:3000/admin/courses/"+course._id, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + localStorage.getItem("token"), //this header is necessary to be senf using the header for the admin to be authenticated using the token stored in local storage until the admin signs out
                    },

                    body: JSON.stringify({
                      title: title,
                      description: description,
                      price: "",
                      imageLink: image,
                      published: true,
                    }),
                  }).then((res) =>
                    res.json().then((data) => {
                      let updatedCourses=[];
                      for(let i=0;i<props.courses.length;i++){
                        if(course._id==props.courses[i]._id){
                          updatedCourses.push({
                            _id:course._id,
                            title:title,
                            description:description,
                            imageLink:image
                          })
                      }
                      else
                      updatedCourses.push(props.courses[i])
                    }
                    props.setCourses(updatedCourses);
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
      </div>
    </>
  );
}

export default Course;
