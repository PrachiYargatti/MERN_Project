const express = require("express")
const cryptojs = require("crypto-js")
const jwt = require("jsonwebtoken")

const result = require("../utils/result")
const config = require("../utils/config")
const pool = require("../db/pool")

const router = express.Router()

// POST : /user/signin
router.post("/signin", (req, res) => {

    const email = req.body.email?.trim()
    const password = req.body.password?.trim()

    console.log("=================================")
    console.log("LOGIN REQUEST")
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
            console.log("DB ERROR:", error)

            return res.send(
                result.createResult(error)
            )
        }

        console.log("Rows Found:", data.length)

        if (data.length === 0) {

            console.log("INVALID LOGIN")

            return res.send(
                result.createResult(
                    "Invalid email or password"
                )
            )
        }

        const user = data[0]

        const payload = {
            email: user.email,
            role: user.role
        }

        const token = jwt.sign(
            payload,
            config.SECRET
        )

        const userData = {
            email: user.email,
            role: user.role,
            token
        }

        console.log("LOGIN SUCCESS")

        res.send(
            result.createResult(
                null,
                userData
            )
        )
    })
})

router.get("/", (req, res) => {

    const email = req.headers.email

    const sql = `
        SELECT *
        FROM users
        WHERE email = ?
    `

    pool.query(sql, [email], (error, data) => {
        res.send(
            result.createResult(error, data)
        )
    })
})

module.exports = router