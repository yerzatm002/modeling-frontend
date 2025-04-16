import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import LessonDetails from "./pages/LessonDetails";
import TaskDetails from "./pages/TaskDetails";
import AdminTaskDetails from "./pages/AdminTaskDetails";
import AdminDashboard from "./pages/AdminDashboard";
import AdminTasks from "./pages/AdminTasks";
import CourseDetails from "./pages/CourseDetails";
import ChallengeDetails from "./pages/ChallengeDetails";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Tools from "./pages/Tools";
import PrinterSimulator from "./pages/PrinterSimulator";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/tasks/:id" element={<AdminTaskDetails />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/submissions" element={<AdminTasks />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/lessons/:id" element={<LessonDetails />} />
        <Route path="/tasks/:id" element={<TaskDetails/>} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/challenges/:id" element={<ChallengeDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/3d-printer-simulator" element={<PrinterSimulator />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
