import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { createContext, useState } from "react"
import CourseDetails from './pages/CourseDetails';
import AllCourses  from "./pages/AllCourses"
import ProtectedRoute from "./routes/ProtectedRoute"
import AdminRoute from "./routes/AdminRoute"
import UpdateCourse from "./pages/UpdateCourse"

export const LoginContext = createContext()

// functional components
function App() {

  const [loginStatus, setLoginStatus] = useState(false)

  return (
    <>
      <LoginContext.Provider value={{loginStatus, setLoginStatus}}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/course-details" element={<CourseDetails />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/course/all-courses"
            element={
              <ProtectedRoute>
                <AllCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/update-course"
            element={
              <AdminRoute>
                <UpdateCourse />
              </AdminRoute>
            }
          />
        </Routes>
      </LoginContext.Provider>
      <ToastContainer />
    </>
)}

export default App