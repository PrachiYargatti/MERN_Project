import AppNavbar from "../components/AppNavbar";

function About() {
  return (
    <>
      <AppNavbar />

      <div className="container mt-5">
        <h2 className="mb-4">About</h2>

        <p>
          This platform is designed to make learning simple, practical, and
          accessible. It brings students and administrators together in one
          system where courses, videos, and enrollments are managed seamlessly.
        </p>

        <p>
          Students can explore active courses, enroll easily, and access
          learning content in a structured way. Administrators can efficiently
          create, update, and manage courses and videos while tracking student
          participation.
        </p>

        <p>
          The goal of this application is to provide a clean, secure, and
          user-friendly learning experience that supports continuous growth and
          skill development.
        </p>

        <div className="alert alert-info mt-4">
          <h5>Demo Login Credentials</h5>

          <p className="mb-2">
            <strong>Admin Login</strong>
            <br />
            Email: prachi@gmail.com
            <br />
            Password: admin
          </p>

          <p className="mb-0">
            <strong>Student Login</strong>
            <br />
            Email: rahul@gmail.com
            <br />
            Password: sunbeam
          </p>
        </div>
      </div>
    </>
  );
}

export default About;