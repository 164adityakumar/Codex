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

  },
  typography: {
    h5: {
      fontFamily: "'Sedgwick Ave Display', cursive",
      fontFamily: "'Leckerli One', cursive",
    },
    button: {
      fontFamily: "sans-serif",
      fontWeight: "bold",
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
