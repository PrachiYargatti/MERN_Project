const express = require("express") //js framework, Handles routing, middleware, HTTP lifecycle
const cors = require("cors") //Enables cross-origin requests (frontend ↔ backend)
// Prevents browser-level request blocking

const userRouter = require("./routes/user")
const studentRouter = require("./routes/student")
const courseRouter = require("./routes/course")
const videoRouter = require("./routes/video")
const adminRouter = require("./routes/admin")
const { authUser } = require("./utils/auth")
const db = require("./db/pool")

const app = express()

// CORS FIRST
app.use(cors({
  origin: true,
  credentials: true
}))
// JSON
app.use(express.json())

db.getConnection((err, connection) => {
  if (err) console.log("Database Error:", err);
  else {
    console.log("MySQL Connected Successfully");
    connection.release();
  }
});


// PUBLIC ROUTES (NO AUTH)
app.use("/user", userRouter) 

// AUTH AFTER LOGIN/SIGNUP
app.use(authUser)

// PROTECTED ROUTES
app.use("/course", courseRouter)
app.use("/video", videoRouter)
app.use("/admin", adminRouter)
app.use("/student", studentRouter)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});