import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./signup.jsx";
import Signin from "./signin.jsx";
import Appbar from "./Appbar.jsx";
import Addcourse from "./addcourse.jsx";
import Courses from "./courses.jsx";
import Course from "./Course.jsx";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

function App() {
  return (
    <>
      <div>
        <RecoilRoot>
        <Router>
          <Appbar />
          <Routes>
            <Route path="/addcourse" element={<Addcourse />} />
            <Route path="/course/:courseid" element={<Course/>}/>
            <Route path="/courses" element={<Courses />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
        </Router>
        </RecoilRoot>
      </div>
    </>
  );
}

export default App;
