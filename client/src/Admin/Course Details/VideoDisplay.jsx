import { useState } from "react";
import { Card, InputLabel, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useRecoilState } from "recoil";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import { useRef } from "react";
import { selectedVideoState, videoState } from "./Course";
import { ProgressBar } from "react-loader-spinner";
export function VideoDisplay({ course }) {
  const [selectedVideo, setSelectedVideo] = useRecoilState(selectedVideoState);
  const videoNameRef = useRef(); // Add this line
  const [selectedFile, setSelectedFile] = useState(null);
  const [videos, setVideos] = useRecoilState(videoState);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Add this line

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]); // Add this line
  };

  const handleVideoUpload = async () => {
    setLoading(true);

    if (!selectedFile) {
      alert("Please select a file");
      setLoading(false); // Set loading to false if no file is selected
      return;
    }

    const videoFile = selectedFile;
    const videoName = videoNameRef.current.value;

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("name", videoName);

    try {
      const response = await axios.post(
        `https://codexbackend.onrender.com/admin/course/${course._id}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setVideos([
        ...videos,
        { name: response.data.videoName, path: response.data.downloadURL },
      ]);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to upload video", error);
    } finally {
      setLoading(false); // Set loading to false after upload is done
    }
  };

  const handleVideoSelection = (videoPath) => {
    setSelectedVideo(videoPath);

    setLoading(false);
  };

  const handleVideoDelete = async (videoId) => {
    try {
      await axios.delete(
        `https://codexbackend.onrender.com/admin/course/${course._id}/video/${videoId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      setVideos(videos.filter((video) => video.id !== videoId));
    } catch (error) {
      console.error("Failed to delete video", error);
    }
  };

  const handleClickOpen = (videoId) => {
    setSelectedVideo(videoId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    handleVideoDelete(selectedVideo);
    setOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Dialog open={loading}>
        <DialogTitle
          style={{
            textAlign: "center",
          }}
        >
          Uploading
        </DialogTitle>
        <DialogContent>
          <ProgressBar
            // height="80"
            width="150"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#312F28"
            barColor="#3DD85C"
          />{" "}
        </DialogContent>
      </Dialog>

      <div>
        <Card
          style={{
            width: 400,
            // marginTop: 200,
            display: "flex",
            flexDirection: "column",
            padding: 20,
            maxHeight: 500,
            overflowY: "auto",
          }}
        >
          <TextField inputRef={videoNameRef} label="Video Name" />
          <div style={{ padding: 10 }}>
            <input
              style={{ display: "none" }}
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              accept="video/*"
            />
            {selectedFile && (
              <Typography
                fontFamily={{
                  fontFamily: "monospace",
                }}
                style={{
                  marginBottom: 10,
                }}
                variant="subtitle2"
              >
                Selected file: {selectedFile.name}
              </Typography>
            )}
            <div
              style={{
                display: "flex",
                // justifyContent: "center",
                flexDirection: "row",
                gap: 10,
              }}
            >
              <InputLabel
                htmlFor="file-upload"
                style={{
                  padding: 10,
                  color: "white",
                  backgroundColor: "#1a73e9",
                  cursor: "pointer",
                  borderRadius: 4,
                  // marginRight: 150,
                  textAlign: "center",
                  fontSize: 13,
                }}
              >
                BROWSE
              </InputLabel>
              <Button variant={"contained"} onClick={handleVideoUpload}>
                Upload Video
              </Button>
            </div>
          </div>
          {videos.map(
            (video, index) => (
              console.log(video.path),
              (
                <Accordion
                  variant={"outlined"}
                  key={index}
                  style={{
                    border: "0.05px solid #0513245f",
                    borderRadius: 2,
                    width: "100%",
                    height: "10%",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    onClick={() => handleVideoSelection(video.path)}
                  >
                    <Typography>{video.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {selectedVideo === video.path && (
                      <video style={{ width: "100%", height: "auto" }} controls>
                        <source
                          src={`${selectedVideo}/preview`}
                          type="video/mp4"
                        />
                      </video>
                    )}

                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleClickOpen(video._id)}
                    >
                      Delete Video
                    </Button>

                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Delete Video"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are you sure you want to delete this video?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          Cancel
                        </Button>
                        <Button
                          onClick={handleConfirmDelete}
                          color="error"
                          variant="outlined"
                          autoFocus
                        >
                          Delete
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </AccordionDetails>
                </Accordion>
              )
            )
          )}
        </Card>
      </div>
    </div>
  );
}
