import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./signup.jsx";
import Signin from "./signin.jsx";
import Appbar from "./Appbar.jsx";
import Addcourse from "./addcourse.jsx";
import Courses from "./courses.jsx";
import Course from "./Course.jsx";
// import DisplayCourses from "./DisplayCourse.jsx";
// import MyCourses from "./PurchasedCourses";
// import Admin_Appbar from "./Admin_Appbar.jsx";
// import User_Appbar from "./User_Appbar.jsx";

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
            {/* <Route path="/admin" element={<Admin_Appbar />} /> */}
            {/* <Route path="/user" element={<User_Appbar />} /> */}
            {/* <Route path="/Explore" element={<DisplayCourses />} /> */}
            {/* <Route path="/MyCourses" element={<MyCourses />} /> */}
          </Routes>
        </Router>
        </RecoilRoot>
      </div>
    </>
  );
}

export default App;
