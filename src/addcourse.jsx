import React from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./Pallete";

function addcourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
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
          <Typography variant="h6" color="primary" fontFamily={"monospace"}>
            Add your new course below.
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
              style={{ marginBottom: 10 }}
              onChange={(t) => {
                setTitle(t.target.value);
              }}
            />

            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              style={{ marginBottom: 10 }}
              onChange={(d) => {
                setDescription(d.target.value);
              }}
            />

            <TextField
              fullWidth
              label="Image Link"
              variant="outlined"
              style={{ marginBottom: 10 }}
              onChange={(image) => {
                setImage(image.target.value);
              }}
            />

            <TextField
              style={{ marginBottom: 10 }}
              onChange={(price) => {
                setPrice(price.target.value);
              }}
              fullWidth={true}
              label="Price"
              variant="outlined"
            />
            <ThemeProvider theme={theme}>
            <Button
              size={"large"}
              variant="contained"
              color="primary"
              onClick={() => {
                if (title.length === 0 || description.length === 0) {
                  alert("Course Title or Description cannot be empty.");
                } else {
                  fetch("http://localhost:3000/admin/courses", {
                    method: "POST",

                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + localStorage.getItem("token"), //this header is necessary to be senf using the header for the admin to be authenticated using the token stored in local storage until the admin signs out
                    },

                    body: JSON.stringify({
                      title: title,
                      description: description,
                      price: price,
                      imageLink: image,
                      published: true,
                    }),
                  }).then((res) =>
                    res.json().then((data) => {
                      alert("Course created Successfully!");
                    })
                  );
                }
              }}
            >
              Add Course
            </Button>
            </ThemeProvider>
          </Card>
        </div>
      </div>
    </>
  );
}

export default addcourse;
