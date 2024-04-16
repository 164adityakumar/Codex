import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { ToggleButtonGroup } from "@mui/material";
import { ToggleButton } from "@mui/material";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import CloudUploadTwoToneIcon from "@mui/icons-material/CloudUploadTwoTone";
import StyleTwoToneIcon from "@mui/icons-material/StyleTwoTone";
import { assets } from "./assests";
import "./orbs.css";
import { Box } from "@mui/material";
import { TagFacesTwoTone } from "@mui/icons-material";
import StickyFooter from "./footer";
export default function Home() {
  const [userType, setUserType] = useState("user");
  return (
    <>
      <div
        className="header"
        style={{
          position: "relative",
          color: "white",
          padding: "5vh",
          // backgroundColor: "#051f3a",
          // filter: "contrast(1) grayscale(0) saturate(0.8) brightness(0.87)",
          // padding: "1.2vh",
          // boxShadow: "0px 0px 0px 10px rgba(0,0,0,0.75)",
          borderBottom: "2px solid #c0c0c025",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 100,
            left: 1,
            zIndex: -1,
            backgroundSize: "auto",
            // marginRight: "20px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
            // backgroundImage: `url(https://phdcomics.com/comics/archive/phd011406s.gif)`,
            filter: "contrast(1) grayscale(0) saturate(0.8) ",
            //   backgroundColor: "rgb(0, 0, 0)",
            borderRadius: "4px",
          }}
        />
        <Grid container gap={"1.3vh"}>
          <Grid
            item
            md={6.3}
            xl={6.9}
            // sm={12}
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Paper
              className="gradient-background"
              style={{
                padding: "10vh",
                width: "100%",
                borderRadius: "15px",
                backgroundColor: "#1a3962",
                border: "2px solid #5c91db57",
                // textAlign: "ḷeft",
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                color="#fff"
                gutterBottom
                fontFamily={"Poppins"}
                gap={"1.3vh"}
              >
                <span
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "3.5rem",
                    color: "#ffffff",
                  }}
                >
                  SuperCharge Coding
                </span>
                {/* <br /> */}
                <span
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "3.5rem",
                    textAlign: "justify",
                  }}
                >
                  {"   "}
                  skills{" "}
                </span>{" "}
                <br />
                <span
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "3rem",
                    color: "#ffffffae",
                  }}
                >
                  {" "}
                  with{" "}
                </span>
                <span
                  style={{
                    fontFamily: "Righteous",
                    fontSize: "3.5rem",
                    color: "#7bb4ff",
                    textDecoration: "underline",
                    textDecorationThickness:"0.15em",
                    lineHeight:"0.1em"
                  }}
                >
                  Codex
                </span>
              </Typography>
              <Typography
                component="h5"
                variant="h5"
                color="#ff6a7b"
                paragraph
                fontFamily={"monospace"}
                fontWeight={"bold"}
              >
                Don't be like this guy -{">"}
              </Typography>
            </Paper>
          </Grid>
          <Grid
            item
            md={5.6}
            // lg={6}
            // lg={6}
            xl={5}
            xs={12}

            // style={{
            //   display: "flex",
            //   justifyContent: "center",
            //   alignItems: "center",
            // }}
          >
            <div
              style={{
                width: "auto",
                height: "100%",
                display: "flex",
                gap: "1.3vh",
                flexDirection: "column",
              }}
            >
              <Paper
                style={{
                  width: "auto",
                  height: "100%",
                  // alignContent: "center",
                  backgroundColor: "#f3f3f3",
                  alignItems: "center",
                  // padding: "10vh",
                  borderRadius: "15px",
                  display: "flex",
                  // border : "2px solid #1a3962",
                  justifyContent: "center",
                  // width: "100%",
                }}
              >
                <img
                  src="https://phdcomics.com/comics/archive/phd011406s.gif"
                  alt="phdcomics"
                  style={{
                    maxWidth: "95%",
                    maxHeight: "95%",
                    borderRadius: "15px",
                    filter:
                      "contrast(1) grayscale(0) saturate(0.8) brightness(0.95)",
                  }}
                />
              </Paper>
            </div>
          </Grid>
        </Grid>
      </div>

      <div>
        <div className="main">
          <div>
            <Box
              className="poly"
              style={{
                padding: "10vh",
                border: "3px dashed #79d5ff49",
              }}
            >
              <Typography
                variant="h3"
                style={{
                  color: "rgba(114, 182, 255, 0.973)",
                  fontFamily: "Poppins",
                  textAlign: "center",
                  // marginTop: "10vh",
                  fontWeight: "bold",
                  // marginBottom: "1.3vh",
                }}
              >
                Get a head start to your coding journey today
              </Typography>
            </Box>
          </div>
          <div className="image1">
            <div class="scrollbar"></div>
            <div class="container">
              <Typography
                variant="h4"
                style={{
                  color: "#ffffffc0",
                  fontFamily: "Poppins",
                  textAlign: "center",
                  marginTop: "10vh",
                  fontWeight: "bold",
                  // marginBottom: "1.3vh",
                }}
              >
                Choose the tech stack you want to master
              </Typography>
              <Box
                style={{
                  marginTop: "10vh",
                  width: "85vw",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "15px",
                  // border: "2px solid #000", // Add border to the box
                  // padding: "1em", // Add some padding
                  overflow: "hidden", // Hide the part of the images that's outside the box
                }}
              >
                <div className="zoom-slide">
                  <img
                    src={assets.icons}
                    alt=""
                    style={{
                      width: "100%",
                      height: "auto",
                      // scale: "2",
                    }}
                  />
                  <img
                    src={assets.icons}
                    alt=""
                    style={{
                      width: "100%",
                      height: "auto",
                      // scale: "",
                    }}
                  />
                </div>
              </Box>
            </div>
          </div>
          <div className="image1">
            <div class="scrollbar"></div>
            <div
              class="container"
              style={{
                display: "flex",
                flexDirection: "row",
                // padding: "3vh",
                // gap: "3vh",
              }}
            >
              <div
                style={{
                  borderRight: "2px solid #ffffff4f",
                  // paddingRight: "5vh",
                  padding: "17vh",
                  width: "50%",
                }}
              >
                {" "}
                <Typography
                  variant="h3"
                  style={{
                    color: "#ffffffc0",
                    fontFamily: "Poppins",
                    textAlign: "left",
                    // margin: "10vh",
                    // marginBottom: "5vh",
                    fontWeight: "bold",
                    // marginBottom: "1.3vh",
                  }}
                >
                  Want to be a tutor ?<span></span>
                </Typography>
              </div>
              <div
                style={{
                  width: "50%",
                  padding: "5vh",
                }}
              >
                <img
                  src="https://www.classcentral.com/report/wp-content/uploads/2020/05/cs50ai-e1589908343841-1024x478.png"
                  alt=""
                  style={{
                    width: "100%",
                    border: "2px solid #ffffff1d",
                    borderRadius: "15px",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                marginTop: "10vh",
                gap: "10vh",
              }}
            >
              <Box className="poly"
                style={{
                  padding: "10vh",
                  paddingLeft: "9vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "10vh",
                  // border: "2px solid #ffffff4f",
                  borderRadius: "15px",
                  width: "40%",
                }}
              >
                
                <Typography variant="h3" color="white" fontFamily={"Poppins"}>
                  {" "}
                  Sign up as Admin
                </Typography>
                <ToggleButtonGroup
                  color="error"
                  exclusive
                  size="large"
                  value={"admin"}
                  sx={{
                    backgroundColor: "#ffffff",
                    fontFamily: "Poppins",
                    scale: "1.2",
                  }}
                  onChange={(event, newUserType) => {
                    if (newUserType !== null) {
                      setUserType(newUserType);
                    }
                  }}
                >
                  <ToggleButton value="user">User</ToggleButton>
                  <ToggleButton value="admin">Admin</ToggleButton>
                </ToggleButtonGroup>

              </Box>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "2vh",
                  // padding: "10vh",
                  width: "60%",
                  // paddingRight: "15vh",
                  border: "2px solid #ffffff4f",
                  borderRadius: "15px",
                }}
              >
                <Box className="features">
                  <Typography
                    className="text"
                    variant="h5"
                    textAlign={"left"}
                    color="white"
                    fontFamily={"Poppins"}
                    style={{
                    }}
                  >
                    Create your Courses
                  </Typography>
                  <AddCircleTwoToneIcon
                    style={{
                      fontSize: "4rem",
                      color: "#488de9",
                    }}
                  />
                </Box>
                <Box className="features" style={{
                }}>
                  <Typography
                    className="text"
                    variant="h5"
                    color="white"
                    textAlign={"left"}
                    fontFamily={"Poppins"}
                  >
                    Add tags to your courses
                  </Typography>
                  <StyleTwoToneIcon
                    style={{
                      fontSize: "4rem",
                      color: "#ff6d7f",
                    }}
                  />
                </Box>
                <Box className="features">
                  <Typography
                    className="text"
                    variant="h5"
                    textAlign={"left"}
                    color="white"
                    fontFamily={"Poppins"}
                  >
                    Upload your content
                  </Typography>
                  <CloudUploadTwoToneIcon
                    style={{
                      fontSize: "4rem",
                      color: "#92f78d",
                    }}
                  />
                </Box>
              </Box>
            </div>
          </div>
        </div>
        <StickyFooter/>

      </div>
    </>
  );
}
