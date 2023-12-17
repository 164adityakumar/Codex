import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./signup.jsx";
// import Signin from "./signin.jsx";
import Appbar from "./Appbar.jsx";
import Addcourse from "./Admin/addcourse.jsx";
import Courses from "./Admin/courses.jsx";
import Course from "./Admin/Course Details/Course.jsx";
import Explore from "./User/Explore.jsx";
import MyCourses from "./User/MyCourses.jsx";
import DisplayCourse from "./User/DisplayCourse/DisplayCourse.jsx";
import PaymentGateway from "./User/Cart&Payment/PaymentGateway.jsx";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import UserProfile from "./User/Profileuser.jsx";
import AdminProfile from "./Admin/Profileadmin.jsx";
import Home from "./home.jsx";
function App() {
  return (
    <>
      <div>
        <RecoilRoot>
          <Router>
            <Appbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/addcourse" element={<Addcourse />} />
              <Route path="/course/:courseid" element={<Course />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/signup" element={<Signup />} />
              {/* <Route path="/signin" element={<Signin />} /> */}
              <Route path="/Explore" element={<Explore />} />
              <Route path="/Explore/:courseid" element={<DisplayCourse />} />
              <Route
                path="Explore/:courseid/Purchase"
                element={<PaymentGateway />}
              />
              <Route path="/Profile" element={<UserProfile />} />
              <Route path="/MyCourses" element={<MyCourses />} />
              <Route path="/ProfileAdmin" element={<AdminProfile />} />
            </Routes>
          </Router>
        </RecoilRoot>
      </div>
    </>
  );
}

export default App;
