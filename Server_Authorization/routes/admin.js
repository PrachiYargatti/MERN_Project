const pool = require("../db/pool")
const { checkAuthorization } = require("../utils/auth")
const result = require("../utils/result")
const express = require("express")
const router = express.Router()

// GET : /admin/enrolled-students?course_id=1
// GET : /admin/enrolled-students?course_id=1
router.get("/enrolled-students", checkAuthorization, (req, res) => {
  const { course_id } = req.query

  let sql = `
    SELECT u.email, s.course_id
    FROM students s
    JOIN users u
      ON u.email = s.email
     AND u.role = 'student'
  `
  const params = []

  if (course_id) {
    sql += " WHERE s.course_id = ?"
    params.push(course_id)
  }

  pool.query(sql, params, (error, data) => {
    res.send(result.createResult(error, data))
  })
})

module.exports = router