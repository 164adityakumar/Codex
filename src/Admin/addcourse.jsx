import React from "react";
import TextField from "@mui/material/TextField";
import { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../Pallete";
import Autocomplete from "@mui/material/Autocomplete";
import { Paper } from "@mui/material";

function addcourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [tags, setTags] = useState([]); //tags is an array of strings
  const [optiontags, setOptionTags] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/user/tags", {
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
  console.log(tags);
  return (
    <>
      <div
        style={{
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Paper 
            style={{
              marginTop: 30,
              marginBottom: 10,
              display: "flex",
              width: "62%",
              height: "auto",
              justifyContent: "center",
              padding: 10,
              background: "linear-gradient(132deg, rgba(255, 255, 255, 0.206) 0%, rgba(238, 238, 238, 0.168) 20%, rgba(202, 202, 202, 0.148) 70%, rgba(171, 171, 171, 0.024) 100%)",
              border: "solid rgba(255, 255, 255, 0.06) 1px",
              borderRadius: "15px",
            }}
          >
            <Typography
              variant="h6"
              color="#ffffff"
              fontSize={"2rem"}
              fontWeight={"300rem"}
              fontFamily={"Poppins"}
            >
             <b> Add your new course below </b>
            </Typography>
          </Paper>
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
              width: "60%",
              padding: 20,
              backgroundColor: "#f1f5fed6",
            }}
            fontFamily={"monospace"}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                }}
              >
                <TextField
                  fullWidth
                  required={true}
                  label="Course Title"
                  variant="outlined"
                  style={{ marginBottom: 10 }}
                  onChange={(t) => {
                    setTitle(t.target.value);
                  }}
                />
                <TextField
                  fullWidth
                  required={true}
                  label="Image Link"
                  variant="outlined"
                  style={{ marginBottom: 10 }}
                  onChange={(image) => {
                    setImage(image.target.value);
                  }}
                />

                <TextField
                  style={{ marginBottom: 10 }}
                  required={true}
                  onChange={(price) => {
                    setPrice(price.target.value);
                  }}
                  fullWidth={true}
                  label="Price"
                  variant="outlined"
                />
                <Autocomplete
                  multiple
                  id="tags-filled"
                  options={optiontags}
                  defaultValue={[]}
                  freeSolo
                  onChange={(event, value) => setTags(value)}
                  renderInput={(params) => (
                    // console.log(params),
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Tags"
                      style={{ marginBottom: 10 }}
                      placeholder="Favorites"
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          setTags((oldTags) => [
                            ...oldTags,
                            event.target.value,
                          ]);
                        }
                      }}
                    />
                  )}
                />
              </div>
              <div
                style={{
                  width: "50%",
                }}
              >
                <TextField
                  fullWidth
                  label="Description"
                  variant="filled"
                  multiline
                  rows={10}
                  style={{ marginBottom: 10 }}
                  onChange={(d) => {
                    setDescription(d.target.value);
                  }}
                />
              </div>
            </div>
            <ThemeProvider theme={theme}>
              <Button
                size={"large"}
                variant="contained"
                color="secondary"
                onClick={() => {
                  if (
                    title.length === 0 ||
                    description.length === 0 ||
                    tags.length === 0 ||
                    price.length === 0 ||
                    image.length === 0
                  ) {
                    alert("all fields are required");
                  } else {
                    fetch("http://localhost:3000/admin/courses", {
                      method: "POST",

                      headers: {
                        "Content-Type": "application/json",
                        Authorization:
                          "Bearer " + localStorage.getItem("token"), //this header is necessary to be senf using the header for the admin to be authenticated using the token stored in local storage until the admin signs out
                      },

                      body: JSON.stringify({
                        title: title,
                        description: description,
                        price: price,
                        imageLink: image,
                        published: true,
                        tags: tags,
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
