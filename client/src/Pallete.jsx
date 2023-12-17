import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#488de9",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#1a73e9",
      // light: "#ff6d7f",
      // dark: will be calculated from palette.secondary.main,
      //   contrastText: "#47008F",
    },
    error: {
      main: "#ce7681",
    },
    warning: {
      main: "#ff6d7f",
    },
    info: {
      main: "#D65967",
    },
  },
  typography: {
    h5: {
      // fontFamily: "'Sedgwick Ave Display', cursive",
      // fontFamily:"monospace:"
      fontFamily: "Righteous",
    },
    button: {
      fontFamily: "Josefin Sans",
      fontWeight: "bold",
      lineHeight: 1.6,
      // fontSize: "1.2rem",
      // fontFamily: "'Leckerli One', cursive",
    },
    card: {
      // fontFamily: "'Sedgwick Ave Display', cursive",
      fontFamily: "'Leckerli One', cursive",
      backgroundColor: "#0f1e2b",
    },
  },
});
