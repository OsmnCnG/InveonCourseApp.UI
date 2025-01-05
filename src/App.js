import './App.css';
import Header from './components/Header';
import CategoryCourses from './pages/CategoryCourses';
import CourseDetail from './pages/CourseDetail';
import Courses from './pages/Courses';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Card from './pages/Card';
import InstructorPage from './pages/InstructorCourses';
import ForbiddenPage from './pages/Forbidden';
import PaymentForm from './pages/Payment';
import UserCourses from './pages/UserCourses';
import CreateCourse from './pages/CreateCourse';
import RegisterPage from './pages/Register';
import Profile from './pages/Profile';

function App() {

  return (
    <div>
      <Router>
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/Forbidden" element={<ForbiddenPage/>}></Route>
            <Route path="/Login" element={<Login/>}></Route>
            <Route path="/courses" element={<Courses/>}></Route>
            <Route path="/courses/:category" element={<CategoryCourses/>}></Route>
            <Route path="/course/:courseId" element={<CourseDetail/>}></Route>
            <Route path="/Card" element={<Card/>}></Route>
            <Route path="/InstructorCourses" element={<InstructorPage/>}></Route>
            <Route path="/Payment" element={<PaymentForm/>}></Route>
            <Route path="/MyCourses" element={<UserCourses/>}></Route>
            <Route path="/CreateCourse" element={<CreateCourse/>}></Route>
            <Route path="/Register" element={<RegisterPage/>}></Route>
            <Route path="/Profile" element={<Profile/>}></Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
