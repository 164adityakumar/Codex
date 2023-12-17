import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { a11yProps, CustomTabPanel } from "./DisplayCourse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Icon, Typography } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { Box } from "@mui/system";
import { useRecoilState } from "recoil";
import { courseState } from "./DisplayCourse";
import "./CourseContent.css";
import { UserState } from "../MeState";
import { atom } from "recoil";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { useEffect } from "react";
export function CourseContent() {
  const [value, setValue] = useState(0);
  const [course] = useRecoilState(courseState);
  const [user, setUser] = useRecoilState(UserState);

  const [isPurchased, setIsPurchased] = useRecoilState(IsPurchasedstate);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log(localStorage.getItem("token"));
    fetch(`https://codexbackend.onrender.com/user/me`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        console.log(data);
      });
  }, []);

  console.log(isPurchased);
  const PurchasedCourses = user.purchasedCourses;
  console.log(PurchasedCourses);

  if (PurchasedCourses != null) {
    if (PurchasedCourses.includes(course._id)) {
      setIsPurchased(true);
    }
  }

  return (
    <div>
      <Box
        sx={{
          border: "2px solid #488de9",
          borderRadius: "10px",
          backgroundColor: "#2e3339b1",
          maxHeight: "85vh",
          overflow: "auto",
          flexGrow: 1,
          marginBottom: 2,
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "#488ee97e",
            backgroundColor: "#101e32ad",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="basic tabs example"
            textColor="primary"
            indicatorColor="primary"
            centered
          >
            <Tab
              label="Overview"
              {...a11yProps(0)}
              sx={{
                color: "#ffffff83",
                fontWeight: "bold",
                fontSize: "1.1rem",
                fontFamily: "monospace",
              }}
            />
            <Tab
              label="Content"
              {...a11yProps(1)}
              sx={{
                color: "#ffffff83",
                fontWeight: "bold",
                fontSize: "1.1rem",
                fontFamily: "monospace",
              }}
            />
            <Tab
              label="Livestream"
              {...a11yProps(2)}
              sx={{
                color: "#ffffff83",
                fontWeight: "bold",
                fontSize: "1.1rem",
                fontFamily: "monospace",
              }}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <OverviewTab />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <VideoTab />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <LivestreamTab />
        </CustomTabPanel>
      </Box>
    </div>
  );
}
function LivestreamTab() {
  return (
    <div>
      <Typography
        variant="h6"
        fontFamily={"monospace"}
        style={{ color: "#78B4E3E9" }}
      >
        Arriving Soon
      </Typography>
    </div>
  );
}
function OverviewTab() {
  const [course] = useRecoilState(courseState);
  return (
    <div>
      <Typography
        variant="body1"
        fontFamily={"monospace"}
        style={{ color: "#78B4E3E9" }}
      >
        {course.description}
      </Typography>
    </div>
  );
}

export function VideoTab() {
  const [course] = useRecoilState(courseState);
  const [user, setUser] = useRecoilState(UserState);
  const [isPurchased] = useRecoilState(IsPurchasedstate);

  const videos = course.videos;
  const className = isPurchased ? "" : "blurred-content";

  return (
    <div>
      <Box>
        {videos.map(
          (video, index) => (
            console.log(video.name),
            (
              <Accordion
                key={index}
                variant="outlined"
                style={{
                  backgroundColor: "#364c67",
                  marginBottom: "5px",
                  border: "1px solid #7ba9e5",
                  borderRadius: "5px",
                  color: "#ffffffe9",
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{video.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div
                    className={className}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                      gap: "10px",
                    }}
                  >
                    <video
                      src={video.path}
                      controls
                      style={{
                        width: "40%",
                        height: "auto",
                        borderRadius: "5px",
                        border: "1px solid #488de9",
                        flexShrink: 0,
                      }}
                    />
                    <Box
                      style={{
                        borderRadius: "5px",
                        backgroundColor: "#d2e5ffac",
                        width: "100%",
                        height: "auto",
                        flexGrow: 1,
                        padding: "10px",
                      }}
                    >
                      No Resources Yet
                    </Box>
                  </div>
                  {!isPurchased && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent black
                      }}
                    >
                      <div style={{}}>
                        <LockPersonIcon
                          style={{
                            fontSize: "4rem",
                            marginRight: "10px",
                          }}
                        />
                        {/* <p>Enroll now to Unlock the Content</p> */}
                      </div>
                    </div>
                  )}
                </AccordionDetails>
              </Accordion>
            )
          )
        )}
      </Box>
    </div>
  );
}

const IsPurchasedstate = atom({
  key: "isPurchased",
  default: false,
});
