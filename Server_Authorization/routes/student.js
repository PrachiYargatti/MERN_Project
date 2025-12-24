const express = require("express")
const result = require("../utils/result")
const pool = require("../db/pool")
const cryptojs = require("crypto-js")

const router = express.Router()

// Student APIs
// POST : student/register-to-course
router.post("/register-to-course", (req,res) => {
    const {name, email, course_id, mobile_no} = req.body
    // check if student already present in the users table or not
    const checkUserSql = `SELECT * FROM users WHERE email=?`
    pool.query(checkUserSql, [email], (error, data) => {
        if(error) {
            res.send(result.createResult(error))
        }
        else if(data.length == 0) {
            // if not present, add to users table with role as student and default password as 'sunbeam'
            const defaultPassword = cryptojs.SHA256("sunbeam").toString()
            const insertUserSql = `INSERT INTO users(email, password, role) VALUES(?,?,?)`
            pool.query(insertUserSql, [email, defaultPassword, "student"], (error, data) => {
                if(error) {
                    res.send(result.createResult(error))
                }
                else {
                    // now add to students table
                    const insertStudentSql = `INSERT INTO students(name, email, course_id, mobile_no) VALUES(?,?,?,?);`
                    pool.query(insertStudentSql, [name, email, course_id, mobile_no], (error, data) => {
                        res.send(result.createResult(error,data))
                    })
                }
            })
        }
        else {
            // if present, directly add to students table
            const insertStudentSql = `INSERT INTO students(name, email, course_id, mobile_no) VALUES(?,?,?,?);`
            pool.query(insertStudentSql, [name, email, course_id, mobile_no], (error, data) => {
                res.send(result.createResult(error,data))
            })
        }
    })
})

//PUT : student/change-password
router.put("/change-password", (req,res) => {
    const {newPassword, confirmPassword} = req.body
    const email = req.headers.email

    if(newPassword !== confirmPassword) {
        res.send(result.createResult("New Password and Confirm Password do not match"))
    }
    else {
        const hashedPassword = cryptojs.SHA256(newPassword).toString()
        const sql = `UPDATE users SET password=? WHERE email=?;`
        pool.query(sql, [hashedPassword, email], (error, data) => {
            res.send(result.createResult(error,data))
        })
    }
})

// GET : student/my-courses 
router.get("/my-courses", (req, res) => {
    const email = req.headers.email
    const sql = `
        SELECT c.course_id, c.course_name, c.description, c.fees, c.start_date, c.end_date, c.video_expire_days
        FROM courses c
        JOIN students s ON c.course_id = s.course_id
        WHERE s.email = ?;
    `
    pool.query(sql, [email], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

//GET : student/my-course-with-videos
router.get("/my-course-with-videos", (req, res) => {
    const email = req.headers.email
    const sql = `
        SELECT c.course_id, c.course_name, c.description, c.fees, c.start_date, c.end_date, c.video_expire_days,
               v.video_id, v.title, v.description AS video_description, v.youtube_url, v.added_at
        FROM courses c
        JOIN students s ON c.course_id = s.course_id
        JOIN videos v ON c.course_id = v.course_id
        WHERE s.email = ?;  
    `
    pool.query(sql, [email], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

// DELETE : student/delete
router.delete("/delete", (req,res) => {
    const {email} = req.headers
    const sql = `DELETE FROM students WHERE email=?;`
    pool.query(sql, [email], (error, data) => {
        res.send(result.createResult(error,data))
    })
})

module.exports = router

// router.get("/", (req,res) => {
//     const sql = `SELECT * FROM students;`
//     pool.query(sql, (error,data) => {
//         res.send(result.createResult(error,data))
//     })
// })

// router.post("/", (req,res) => {
//     const {name, email, course_id, mobile_no} = req.body
//     const sql = `INSERT INTO students(name, email, course_id, mobile_no) VALUES(?,?,?,?);`
//     pool.query(sql, [name, email, course_id, mobile_no], (error, data) => {
//         res.send(result.createResult(error,data))
//     })
// })

// router.put("/", (req,res) => {
//     const {email, mobile_no} = req.body
//     const sql = `UPDATE students SET mobile_no=? WHERE email=?;`
//     pool.query(sql, [mobile_no, email], (error, data) => {
//         res.send(result.createResult(error,data))
//     })
// })