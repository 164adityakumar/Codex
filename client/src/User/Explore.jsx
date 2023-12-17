import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../Pallete";
import { atom, useRecoilState } from "recoil";
import "./Explore.css";
import axios from "axios";
import { Box } from "@mui/system";

function Explore() {
  const [courses, setCourses] = useRecoilState(coursesState);
  const [selectedTags] = useRecoilState(selectedTagsState);
  const [filteredCourses, setFilteredCourses] = useState([]);
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

  const fetchCoursesByTags = async (tags) => {
    const response = await axios.get(
      `https://codexbackend.onrender.com/user/courses-by-tags?tags=${tags.join(
        ","
      )}`
    );
    return response.data;
  };
  useEffect(() => {
    if (selectedTags.length > 0) {
      fetchCoursesByTags(selectedTags).then(setFilteredCourses);
    } else {
      setFilteredCourses(courses);
    }
  }, [selectedTags, courses]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "center",
        // gap: 5,
        // backgroundColor: "#f2f2f2",
        // backgroundColor:"#0f1e2b",
      }}
    >
      <Banner />
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
          {filteredCourses.map((course) => {
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
          // marginInline: 40,
          // marginRight: 60,
          width: "25vw",
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
              // borderBottom: "solid 3px #ff6d7e9c",
            }}
            image={course.imageLink}
            alt="Thumbnail"
          />{" "}
          <Box
            style={{
              // marginTop: "-10px",
              background: "#ffffff0",
              padding: "5px",
              paddingLeft: "10px",
              borderTop: "solid 3px #ff6d7e9c",
              borderBottom: "solid 3px #ff6d7e9c",
            }}
          >
            <div>
              <Typography
                textAlign={"left"}
                variant="body2"
                color={"#ffffffc4"}
                fontFamily={"Poppins"}
              >
                <b>{course.author}</b>
              </Typography>
            </div>
          </Box>
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
              {/* <Typography textAlign={"left"} variant="body2" color={"GrayText"}>
                <b>Rs {course.price}</b>
              </Typography> */}
              <div
                style={{
                  display: "flex",
                  // justifyContent: "flex-end",
                  gap: "5px",
                  flexWrap: "wrap",
                  overflow: "auto",
                  // maxHeight: "80px",
                }}
              >
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

function Tags({ tag }) {
  console.log(tag);

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
function TagsBanner() {
  // console.log(tag);
  const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);
  const [bannerTags] = useRecoilState(BannertagsState);
  const handleDelete = (tagToDelete) => () => {
    setSelectedTags((tags) => tags.filter((tag) => tag !== tagToDelete));
  };
  //sort an array
  const sortedBannerTags = [...bannerTags].sort();
  return (
    <div>
      {sortedBannerTags.map((tag) => (
        <ThemeProvider theme={theme}>
          <Chip
            style={{
              color: "#ffffff",
              fontSize: "14px",
              fontFamily: "monospace",
              fontWeight: "bold",
              margin: "5px",
              padding: "5px",
            }}
            size="small"
            key={tag}
            label={tag}
            color={selectedTags.includes(tag) ? "secondary" : "info"}
            clickable
            onClick={() => {
              if (selectedTags.includes(tag)) {
                setSelectedTags(selectedTags.filter((t) => t !== tag));
              } else {
                setSelectedTags([...selectedTags, tag]);
              }
            }}
            onDelete={
              selectedTags.includes(tag) ? handleDelete(tag) : undefined
            }
          />
        </ThemeProvider>
      ))}
    </div>
  );
}
function Banner() {
  const [, setBannerTags] = useRecoilState(BannertagsState);
  useEffect(() => {
    fetch("https://codexbackend.onrender.com/user/tags", {
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
          minheight: "20vh",
          background:
            "linear-gradient(132deg, rgba(255, 255, 255, 0.206) 0%, rgba(238, 238, 238, 0.168) 20%, rgba(202, 202, 202, 0.148) 70%, rgba(171, 171, 171, 0.024) 100%)",
          border: "solid rgba(137, 155, 203, 0.467) 3px",
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

          <div
            style={{
              color: "#ff6d7f",
              fontSize: "25px",
              fontFamily: "monospace",
              fontWeight: "bold",
            }}
          >
            filter by tags
          </div>
          {/* {Bannertags.map((tag) => {
            // console.log(tag) */}

          <TagsBanner />
          {/* })} */}
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

const selectedTagsState = atom({
  key: "selectedTags",
  default: [],
});
const BannertagsState = atom({
  key: "bannerTags",
  default: [],
});
export default Explore;
