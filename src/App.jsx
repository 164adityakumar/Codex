import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./signup.jsx";
import Signin from "./signin.jsx";
import Appbar from "./Appbar.jsx";
import Addcourse from "./addcourse.jsx";
import Courses from "./courses.jsx";
import Course from "./Course.jsx";
import Explore from "./Explore.jsx";
// import MyCourses from "./MyCourses.jsx";
import DisplayCourse from "./DisplayCourse/DisplayCourse.jsx";
import PaymentGateway from "./Cart&Payment/PaymentGateway.jsx";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import UserProfile from "./Profileuser.jsx";
function App() {
  return (
    <>
      <div>
        <RecoilRoot>
          <Router>
            <Appbar />
            <Routes>
              <Route path="/addcourse" element={<Addcourse />} />
              <Route path="/course/:courseid" element={<Course />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/Explore" element={<Explore />} />
              <Route path="/Explore/:courseid" element={<DisplayCourse />} />
              <Route
                path="Explore/:courseid/Purchase"
                element={<PaymentGateway />}
              />
              <Route path="/Profile" element={<UserProfile />} />
              {/* <Route path="/MyCourses" element={<MyCourses />} /> */}
            </Routes>
          </Router>
        </RecoilRoot>
      </div>
    </>
  );
}

export default App;
