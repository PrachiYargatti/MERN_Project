const express = require("express")
const cryptojs = require("crypto-js")
const jwt = require("jsonwebtoken")

const result = require("../utils/result")
const config = require("../utils/config")
const pool = require("../db/pool")

const router = express.Router()

// POST : /user/signin
router.post("/signin", (req, res) => {
  const { email, password } = req.body

  console.log("Email:", email)
  console.log("Password:", password)

  const hashedPassword = cryptojs.SHA256(password).toString()

  console.log("Generated Hash:", hashedPassword)

  const sql = `
    SELECT *
    FROM users
    WHERE email = ?
      AND password = ?
  `

  pool.query(sql, [email, hashedPassword], (error, data) => {
    if (error) {
      console.log("DB Error:", error)
      return res.send(result.createResult(error))
    }

    console.log("Rows Found:", data.length)

    if (data.length === 0) {
      return res.send(
        result.createResult("Invalid email or password")
      )
    }

    const user = data[0]

    const payload = {
      email: user.email,
      role: user.role
    }

    const token = jwt.sign(payload, config.SECRET)

    const userData = {
      email: user.email,
      role: user.role,
      token
    }

    res.send(
      result.createResult(null, userData)
    )
  })
})

module.exports = router