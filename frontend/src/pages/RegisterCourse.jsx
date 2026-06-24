import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import AppNavbar from "../components/AppNavbar";
import { registerCourse } from "../services/courseService";

function RegisterCourse() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { course } = state || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  if (!course) {
    return <div className="container mt-5">Invalid course</div>;
  }

  const handleRegister = async () => {
    // Name validation
    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    const nameRegex = /^[A-Za-z ]+$/;
    if (!nameRegex.test(name)) {
      alert("Name should contain only letters");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Mobile validation
    const mobileRegex = /^[0-9]{10}$/;

    if (!mobileRegex.test(mobile)) {
      alert("Mobile number must be exactly 10 digits");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");

      const student = {
        name,
        email,
        mobile_no: mobile,
      };

      const response = await registerCourse(
        course.course_id,
        student,
        token
      );

      if (response.status === "success") {
        alert("Course registered successfully");
        navigate("/");
      } else {
        alert(response.error || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <AppNavbar />

      <div className="container py-5 w-50">
        {/* Course Summary */}
        <div className="card mb-4">
          <div className="card-body">
            <h5>{course.course_name}</h5>
            <p className="mb-1">Fees: ₹{course.fees}</p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="card shadow">
          <div className="card-body">
            <h4 className="mb-4">Register to Course</h4>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Mobile Number"
              maxLength="10"
              value={mobile}
              onChange={(e) =>
                setMobile(e.target.value.replace(/\D/g, ""))
              }
            />

            <button
              className="btn btn-info w-100"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterCourse;