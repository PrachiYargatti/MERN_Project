const express = require("express")
const result = require("../utils/result")
const pool = require("../db/pool")
const cryptojs = require("crypto-js")
const { checkAuthorizationForStudent } = require("../utils/auth")

const router = express.Router()

// ==========================================
// POST : /student/register-to-course
// ==========================================
router.post("/register-to-course", (req, res) => {

  const { name, email, course_id, mobile_no } = req.body

  // Validation
  if (!name || !email || !course_id || !mobile_no) {
    return res.send(
      result.createResult("All fields are required")
    )
  }

  const nameRegex = /^[A-Za-z ]+$/

  if (!nameRegex.test(name.trim())) {
    return res.send(
      result.createResult(
        "Name should contain only letters and spaces"
      )
    )
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    return res.send(
      result.createResult(
        "Invalid email format"
      )
    )
  }

  const mobileRegex = /^[0-9]{10}$/

  if (!mobileRegex.test(String(mobile_no))) {
    return res.send(
      result.createResult(
        "Mobile number must be exactly 10 digits"
      )
    )
  }

  const checkRegistrationSql = `
    SELECT *
    FROM students
    WHERE email=? AND course_id=?
  `

  pool.query(
    checkRegistrationSql,
    [email, course_id],
    (error, studentRows) => {

      if (error)
        return res.send(result.createResult(error))

      if (studentRows.length > 0) {
        return res.send(
          result.createResult(
            "Already registered for this course"
          )
        )
      }

      const checkUserSql = `
        SELECT *
        FROM users
        WHERE email=?
      `

      pool.query(
        checkUserSql,
        [email],
        (error, userRows) => {

          if (error)
            return res.send(result.createResult(error))

          const insertStudent = () => {

            const insertStudentSql = `
              INSERT INTO students
              (name,email,course_id,mobile_no)
              VALUES(?,?,?,?)
            `

            pool.query(
              insertStudentSql,
              [name, email, course_id, mobile_no],
              (error, data) => {
                res.send(result.createResult(error, data))
              }
            )
          }

          if (userRows.length === 0) {

            const defaultPassword =
              cryptojs.SHA256("sunbeam").toString()

            const insertUserSql = `
              INSERT INTO users
              (email,password,role)
              VALUES(?,?,?)
            `

            pool.query(
              insertUserSql,
              [email, defaultPassword, "student"],
              (error) => {

                if (error)
                  return res.send(
                    result.createResult(error)
                  )

                insertStudent()
              }
            )

          } else {

            insertStudent()

          }
        }
      )
    }
  )
})

// ==========================================
// PUT : /student/change-password
// ==========================================
router.put("/change-password", checkAuthorizationForStudent, (req, res) => {

  const { newPassword, confirmPassword } = req.body
  const email = req.user.email

  if (newPassword !== confirmPassword) {
    return res.send(
      result.createResult("Passwords do not match")
    )
  }

  if (newPassword.length < 8) {
    return res.send(
      result.createResult(
        "Password must be at least 8 characters"
      )
    )
  }

  const hashedPassword =
    cryptojs.SHA256(newPassword).toString()

  const sql = `
    UPDATE users
    SET password=?
    WHERE email=?
  `

  pool.query(
    sql,
    [hashedPassword, email],
    (error, data) => {
      res.send(result.createResult(error, data))
    }
  )
})


// ==========================================
// GET : /student/my-courses
// ==========================================
router.get(
  "/my-courses",
  checkAuthorizationForStudent,
  (req, res) => {

    const email = req.user.email

    const sql = `
      SELECT DISTINCT
        c.course_id,
        c.course_name,
        c.description,
        c.fees,
        c.start_date,
        c.end_date,
        c.video_expire_days
      FROM courses c
      JOIN students s
        ON s.course_id = c.course_id
      WHERE s.email = ?
      ORDER BY c.course_name
    `

    pool.query(
      sql,
      [email],
      (error, data) => {
        res.send(result.createResult(error, data))
      }
    )
  }
)


// ==========================================
// GET : /student/my-course-with-videos
// ==========================================
router.get(
  "/my-course-with-videos",
  checkAuthorizationForStudent,
  (req, res) => {

    const email = req.user.email

    const sql = `
      SELECT
        c.course_id,
        c.course_name,
        v.video_id,
        v.title,
        v.description AS video_description,
        v.youtube_url,
        v.added_at
      FROM students s
      JOIN courses c
        ON c.course_id = s.course_id
      LEFT JOIN videos v
        ON v.course_id = c.course_id
      WHERE s.email = ?
      AND (
        v.video_id IS NULL
        OR DATE_ADD(
             v.added_at,
             INTERVAL c.video_expire_days DAY
           ) >= CURDATE()
      )
      ORDER BY c.course_id,
      v.added_at DESC
    `

    pool.query(sql, [email], (error, data) => {

      if (error)
        return res.send(result.createResult(error))

      const courses = {}

      data.forEach((row) => {

        if (!courses[row.course_id]) {

          courses[row.course_id] = {
            course_id: row.course_id,
            course_name: row.course_name,
            videos: []
          }
        }

        if (row.video_id) {

          courses[row.course_id].videos.push({
            video_id: row.video_id,
            title: row.title,
            description: row.video_description,
            youtube_url: row.youtube_url,
            added_at: row.added_at
          })
        }
      })

      res.send(
        result.createResult(
          null,
          Object.values(courses)
        )
      )
    })
  }
)


// ==========================================
// PUT : /student/update-profile
// ==========================================
router.put(
  "/update-profile",
  checkAuthorizationForStudent,
  (req, res) => {

    const email = req.user.email
    const { name, mobile_no } = req.body

    const sql = `
      UPDATE students
      SET
        name=?,
        mobile_no=?
      WHERE email=?
    `

    pool.query(
      sql,
      [name, mobile_no, email],
      (error) => {

        if (error)
          return res.send(result.createResult(error))

        res.send(
          result.createResult(
            null,
            "Profile updated successfully. Please login again."
          )
        )
      }
    )
  }
)

module.exports = router