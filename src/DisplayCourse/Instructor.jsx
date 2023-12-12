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
          height: "100%",
          flexGrow: 1,
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
            padding: 20,
          }}
        >
          <div>
            <MinidenticonImg
              style={{
                backgroundColor: "#112450",
                border: "solid 3px #ff6d7f",
                width: 80,
                height: 80,
              }}
              saturation="85"
              lightness="40"
              username={Author.userhandle}
            />
          </div>

          <div
            style={{
              marginLeft: 20,
              flexDirection: "column",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Typography
              variant="h4"
              color="initial"
              fontFamily={"monospace"}
              style={{
                color: "#ff6d7f",
              }}
            >
              {Author.userhandle}
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
              }}
            >
              <a href={Author.Links} target={Author.Links} style={{}}>
                {getSocialMediaIcon(Author.Links)}
              </a>
              <div style={{
                padding: 5,
              }}>
                <Typography variant="subtitle1" color="primary">
                  {Author.username}
                </Typography>
              </div>
            </div>
          </div>
        </Box>
        <Box
          style={{
            margin: 30,
            marginLeft: 30,
            alignContent: "space-evenly",
            border: "solid 2px #488de9",
            borderRadius: "20px",
            backgroundColor: "#202b39af",
            padding: 20,
            overflow: "auto",
          }}
        >
          <Typography
            variant="h6"
            color="initial"
            fontFamily={"monospace"}
            style={{
              color: "#afc8ea",
            }}
          >
            {Author.bio}
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
