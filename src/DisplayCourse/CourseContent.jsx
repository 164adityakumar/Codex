import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { a11yProps, CustomTabPanel } from "./DisplayCourse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { Box } from "@mui/system";
import { useRecoilState } from "recoil";
import { courseState } from "./DisplayCourse";
import "./CourseContent.css";

export function CourseContent() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box
        sx={{
          border: "2px solid #488de9",
          borderRadius: "10px",
          backgroundColor: "#2e3339b1",
          height: "100%",
          flexGrow: 1,
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
        <CustomTabPanel value={value} index={0}></CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <VideoTab />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Box>
    </div>
  );
}
export function VideoTab() {
  const [course] = useRecoilState(courseState);
  const videos = course.videos;
  console.log(videos);
  return (
    <Box style={{}}>
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
                    }}
                  >
                    No Resources Yet
                  </Box>
                </div>
              </AccordionDetails>
            </Accordion>
          )
        )
      )}
    </Box>
  );
}
