import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./footer.css";
const theme = createTheme();


export default function StickyFooter() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
        
<footer id="footer">
  <div className="col col1">
    <h3 style={{
        fontSize: "2rem",
        fontFamily:"Poppins",
        fontWeight:"bold",
        color: "#589bff",
    }}>Codex_</h3>
    <p>Made with <span style={{color: "#58bfff"}}>❤</span> by Aditya Kumar</p>
    <div className="social" >
      <a href="https://github.com/164adityakumar/Codex" target="_blank" className="link"><img src="github-pages-logo-repository-fork-github-86eddab19cbc3ae293ada0fe0fb9e27d.png" alt="" style={{
        height: "30px",
        width: "30px",
      }}/></a>
      <a href="" target="_blank" className="link"><img src="https://assets.codepen.io/9051928/x.png" alt="" /></a>
      <a href="" target="_blank" className="link"><img src="https://assets.codepen.io/9051928/youtube_1.png" alt="" /></a>
    </div>
    <p style={{color: "#818181", fontSize:"smaller"}}>2024 © All Rights Reserved to Codex</p>
  </div>
  <div className="col col2">
    <p>About</p>
    <p>Our mission</p>
    <p>Privacy Policy</p>
    <p>Terms of service</p>
  </div>
  <div className="col col3">
    <p>Services</p>
    <p>Products</p>
    <p>Join our team</p>
    <p>Partner with us</p>
  </div>
  <div className="backdrop"></div>
</footer>
        </ThemeProvider>
    );
}
