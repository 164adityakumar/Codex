import { Box } from "@mui/system";
import { minidenticon } from "minidenticons";
import { useMemo } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  GitHub,
  YouTube,
} from "@mui/icons-material";
import { useRecoilState } from "recoil";
import { courseState } from "./DisplayCourse";
import { Avatar, Typography } from "@mui/material";
function getSocialMediaIcon(link) {
  if (!link) {
    return null;
  }
  if (link.includes("facebook")) {
    return (
      <Facebook
        color="primary"
        style={{
          width: "40px",
          height: "40px",
        }}
      />
    );
  } else if (link.includes("twitter")) {
    return (
      <Twitter
        color={"primary"}
        style={{
          width: "40px",
          height: "40px",
        }}
      />
    );
  } else if (link.includes("instagram")) {
    return (
      <Instagram
        color={"primary"}
        style={{
          width: "40px",
          height: "40px",
        }}
      />
    );
  } else if (link.includes("linkedin")) {
    return (
      <LinkedIn
        color={"primary"}
        style={{
          width: "40px",
          height: "40px",
          
        }}
      />
    );
  } else if (link.includes("github")) {
    return (
      <GitHub
        color={"primary"}
        style={{
          width: "40px",
          height: "40px",
        }}
      />
    );
  } else if (link.includes("youtube")) {
    return (
      <YouTube
        color={"primary"}
        style={{
          width: "40px",
          height: "40px",
        }}
      />
    );
  } else {
    return null;
  }
}

const MinidenticonImg = ({ username, saturation, lightness, ...props }) => {
  const svgURI = useMemo(
    () =>
      "data:image/svg+xml;utf8," +
      encodeURIComponent(minidenticon(username, saturation, lightness)),
    [username, saturation, lightness]
  );
  return (
    <>
      <Avatar alt={username} src={svgURI} {...props} />
    </>
  );
};

export function Instructor() {
  const [course] = useRecoilState(courseState);
  const Author=course.Author

  return (
    <div>
      <Box
        sx={{
          border: "2px solid #488de9",
          borderRadius: "10px",
          backgroundColor: "#25456cb0",
          maxHeight: "85vh",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          marginBottom: 2,
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 30,
            marginLeft: 30,
            border: "solid 3.5px #488de9",
            borderRadius: "65px",
            margin: 30,
            backgroundColor: "#202b39af",
            padding: 10,
            justifyContent: "space-between",
            alignitems: "center",
          }}
        >
          <div
            style={{
              // border: "solid 3px #ff6d7f",
              padding: 2.7,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MinidenticonImg
              style={{
                backgroundColor: "#112450",
                border: "solid 3px #ff6d7f",
                width: 60,
                height: 60,
              }}
              saturation="85"
              lightness="40"
              username={Author.userhandle}
            />
          </div>

          {/* <div
            style={{
              // marginLeft: 20,
              flexDirection: "row",
              width: "60%",
              display: "flex",
              justifyContent: "space-evenly",
              textAlign: "left",
              // border: "solid 2px #488de9",
            }}
          > */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                // gap: 2,
                // alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                width: "100%",
              }}
            >
              <Typography
                variant="h5"
                color="initial"
                fontFamily={"monospace"}
                style={{
                  color: "#ff6d7f",
                }}
              >
                {Author.userhandle}
              </Typography>
              <div>
                <a href={Author.Links} target={Author.Links} style={{}}>
                  {getSocialMediaIcon(Author.Links)}
                </a>
              </div>
            </div>
          {/* </div> */}
        </Box>
        <div
          className="instruction"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "50%",
            overflow: "auto",
          }}
        >
          <Box
            style={{
              // margin: 30,
              // marginLeft: 30,
              // flex: "1 0 auto",,
              borderTop: "solid 2px #488de9",
              // borderRadius: "20px",
              backgroundColor: "#202b39af",
              padding: 20,
              overflow: "auto",
            }}
          >
            <div
            // style={{
            //   padding: 5,
            // }}
            >
              <Typography
                variant="subtitle1"
                color="#FE94AB"
                fontFamily={"Poppins"}
              >
                {Author.username}
              </Typography>
            </div>
            <br />
            {Author.bio && (
              <div style={{}}>
                <Typography
                  variant="body1"
                  color="initial"
                  fontFamily={"monospace"}
                  fontStyle={"italic"}
                  style={{
                    color: "#afc8ea",
                  }}
                >
                  {Author.bio}
                </Typography>
              </div>
            )}
          </Box>
        </div>
      </Box>
    </div>
  );
}
