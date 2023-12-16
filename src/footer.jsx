import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

const theme = createTheme();

const styles = {
    footer: {
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
            theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
    },
    contactContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "1rem",
    },
    contactTitle: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        marginBottom: "0.5rem",
    },
    contactDescription: {
        fontSize: "1rem",
        fontWeight: "light",
        marginBottom: "2rem",
    },
    form: {
        display: "grid",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
            
    },
    formInput: {
        width: "100%",
        maxWidth: "40vw",
        padding: "0.5rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    formButton: {
        width: "100%",
        maxWidth: "200px",
        padding: "0.5rem",
        borderRadius: "4px",
        border: "none",
        backgroundColor: "#4caf50",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
    },
    builtBy: {
        marginTop: "1rem",
    },
};

export default function StickyFooter() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box component="footer" sx={styles.footer}>
                <div style={styles.contactContainer}>
                    <h1 style={styles.contactTitle}>Contact Us</h1>
                    <div style={styles.contactDescription}>
                        Post your message below. We will get back to you ASAP
                    </div>
                    <form id="contact_form" name="contact_form" method="post" style={styles.form}>
                        <div>
                            <textarea
                                className="form-control"
                                id="message"
                                name="message"
                                rows="15" 
                                label="Message"
                                placeholder="Enter your message here"
                                // cols={100}
                                style={{width:"130%", maxWidth:"500px", padding:"0.5rem", borderRadius:"4px", border:"1px solid #ccc"}}
                            
                            ></textarea>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                            <div>
                                <label htmlFor="name">Your Name:</label>
                                <input
                                    type="text"
                                    required
                                    maxLength="50"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    style={styles.formInput}
                                />
                            </div>
                            <div>
                                <label htmlFor="email_addr">Your Email:</label>
                                <input
                                    type="email"
                                    required
                                    maxLength="50"
                                    className="form-control"
                                    id="email_addr"
                                    name="email"
                                    placeholder="name@example.com"
                                    style={styles.formInput}
                                />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-success" style={styles.formButton}>
                                Post
                            </button>
                        </div>
                    </form>
                </div>
                <Container maxWidth="sm">
                    <Typography variant="body1" style={styles.builtBy}>
                        Built by Aditya Kumar
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {"Copyright © "}
                        <Link color="inherit" href="https://mui.com/">
                            Codex
                        </Link>{" "}
                        {new Date().getFullYear()}
                        {"."}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Contribute to this project on{" "}
                        <Link
                            color="inherit"
                            href="https://github.com/164adityakumar/Course-App"
                        >
                            GITHUB
                        </Link>{" "}
                        {"."}
                    </Typography>
                </Container>
            </Box>
        </ThemeProvider>
    );
}
