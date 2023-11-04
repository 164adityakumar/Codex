import { Button, Card, CardActionArea, CardContent, CardMedia, Chip, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./Pallete";
import { DataGrid } from "@mui/x-data-grid";
import { atom, useRecoilState } from "recoil";
import Box from "@mui/material/Box";
 import './Explore.css'; 
// import { getRowId } from "@mui/x-data-grid";
function Explore() {
  const [courses, setCourses] = useRecoilState(coursesState);

  useEffect(() => {
    function callback2(data) {
      setCourses(data.courses);
    }
    function callback1(res) {
      res.json().then(callback2);
    }
    fetch("http://localhost:3000/user/courses/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(callback1);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 10,
        // backgroundColor: "#f2f2f2",
        // backgroundColor:"#0f1e2b",
      }}
    >
      <Banner />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          // flexWrap: "wrap",

          justifyContent: "center",
        }}
      >
        {/* <Tags/> */}
        {/* <Box
          style={{
            width: "100vw",
            // marginTop: "20vh",
            // marginLeft: "20vw",
            // display:"flex",

            justifyContent: "center",

            // backgroundColor: "#edf2f638",
            borderRadius: "0.1px",
            borderTop: "solid 3px #ff6d7ed6 ",
          }}
        > */}
        <Grid container>
          {courses.map((course) => {
            return <Course course={course} />;
          })}
        </Grid>
        {/* </Box> */}
      </div>

      {/* <ColumnMenuGrid /> */}
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
          marginInline: 40,
          // marginRight: 60,
          width: 390,
          minHeight: 200,
          maxHeight: 500,
          borderRadius: 15,
          backgroundColor: "#2e3339b1",
        }}
        onClick={() => {
          navigate("/Explore/" + course._id);
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            style={{
              maxwidth: 400,
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
                marginBottom: "3px",
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
              <div style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "5px",
                flexWrap: "wrap",
              }}>
                {tagsarray.map((tag) => {
                  // console.log(tag)
                  return <Tags tag={tag} />;
                })}
              </div>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

function Tags({tag})
{ 
  console.log(tag)

  return (
    <div>
      <Chip
        label={tag}
        size="small"
        style={{
          backgroundColor: "#1a73e9",
          color: "#ffffff",
          fontSize: "12px",
          fontFamily: "monospace",
          fontWeight: "bold",
        }}
      />
    </div>
  );
}
function TagsBanner({ tag }) {
  console.log(tag);

  return (
    <div>
      <Chip
        label={tag}
        size="large"
        style={{
          backgroundColor: "#ff6d7f",
          color: "#000000",
          fontSize: "15px",
          fontFamily: "monospace",
          fontWeight: "bold",
        }}
      />
    </div>
  );
}
function Banner()
{
  const [Bannertags, setBannerTags] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/user/tags", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
        setBannerTags(data.tags);
      });
    });
  }, []);
  return (
    <div
      style={{
        borderBottom: "solid 3px #1a74e985",
      }}
    >
      <Card
        variant={"elevation"}
        style={{
          marginInline: "20px",
          marginTop: "20px",
          marginBottom: "20px",
          height: "20vh",
          backgroundColor: "#2e3339b1",
          border: "solid 3px #1a73e9",
        }}
      >

        <div
          style={{
            display: "flex",
            // justifyContent: "space-between",
            gap: "9px",
            flexWrap: "wrap",
            margin: "13px",
          }}
        >
          <div
                className="blink"
                style={{
                  color: "#ff6d7f",
                  fontSize: "25px",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                }}
              >
                {">_ "}
              </div>
          {Bannertags.map((tag) => {
            // console.log(tag)
            return <TagsBanner tag={tag} />;
          })}
        </div>
      </Card>
    </div>
  );
}
// function ColumnMenuGrid() {
//   const [courses] = useRecoilState(coursesState);
//   const rows = courses.map((course) => ({ ...course, id: course._id }));
//   const columns = [
//     // { field: "id", headerName: "ID", width: 400 },
//     {
//       field: "imageLink",
//       headerName: "Image",
//       width: 400,
//       renderCell: (params) => (
//         <img
//           src={params.value}
//           alt="Course"
//           style={{ width: "100%", height: "auto", marginLeft: "-10px" }}
//         />
//       ),
//     },
//     {
//       field: "title",
//       headerName: "Title",
//       width: 220,
//       renderCell: (params) => (
//         <div
//           style={{
//             display: "flex",
//             alignItems: "start",
//             justifyContent: "flex-start",
//             fontWeight: "bold",
//           }}
//         >
//           <Typography
//             textAlign={"left"}
//             fontFamily={"Leckerli One"}
//             color={"#0f1e2b"}
//             style={{ lineHeight: "5", marginTop: "-130px" }}
//             variant="h5"
//           >
//             {params.value}
//           </Typography>
//         </div>
//       ),
//     },
//     {
//       field: "description",
//       headerName: "Description",
//       width: 300,
//       renderCell: (params) => (
//         <div
//           style={{
//             display: "flex",
//             alignItems: "start",
//             justifyContent: "flex-start",
//             fontWeight: "bold",
//           }}
//         >
//           <Typography
//             textAlign={"left"}
//             fontFamily={"Leckerli One"}
//             color={"#0f1e2b"}
//             style={{ lineHeight: "5", marginTop: "-110px", wrap: "wrap" }}
//             variant="subtitle1"
//           >
//             {params.value}
//           </Typography>
//         </div>
//       ),
//     },
//     {
//       field: "price",
//       headerName: "Price",
//       width: 50,
//       renderCell: (params) => (
//         <div
//           style={{
//             display: "flex",
//             alignItems: "start",
//             justifyContent: "flex-start",
//             fontWeight: "bold",
//           }}
//         >
//           <Typography
//             textAlign={"left"}
//             fontFamily={"Leckerli One"}
//             color={"#0f1e2b"}
//             style={{ lineHeight: "5", marginTop: "-110px" }}
//             variant="subtitle1"
//           >
//             Rs {params.value}
//           </Typography>
//         </div>
//       ),
//     },
//     { field: "price", headerName: "Price", width: 100 },
//   ];



// return (
//   <Box
//     style={{
//       maxHeight: "100vh",
//       width: "100vw",
//       backgroundColor: "#edf2f6b7",
//       marginTop: "50px",
//       // border: "solid 2px #1a73e9 ",
//     }}
//   >
//     <DataGrid
//       rows={rows}
//       columns={columns}
//       rowHeight={224}
//       className="myGrid"
//     />
//   </Box>
// );}

const coursesState = atom({
  key: "courses",
  default: [],
});

export default Explore;
