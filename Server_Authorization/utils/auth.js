const jwt = require("jsonwebtoken")
const config = require("./config")
const result = require("./result")

function authUser(req,res,next) {
    const path = req.url
    if(path == '/user/signin' || path == '/user/signup' || path == '/course/all-active-courses')
        return next()
    else {
        const token = req.headers.token
        if (!token)
            res.send(result.createResult("Token is missing"))
        else{
            try {
                //authorization
                const payload = jwt.verify(token, config.SECRET)
                req.headers.email = payload.email
                req.headers.role = payload.role
                return next()
            }
            catch (err){
                res.send(result.createResult("Token is Invalid"))
            }
       }
    }
}

function checkAuthorization(req,res,next) {
    const role = req.headers.role
    if (role === 'admin'){
        return next()
    }
    else{
        res.send(result.createResult("Unauthorized Access"))
    }
}
module.exports = {authUser, checkAuthorization}