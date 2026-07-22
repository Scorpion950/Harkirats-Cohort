const jwt = require('jsonwebtoken');
const {JWT_USER_PASSWORD} = require("../config");



function userMiddleware(req, res, next) {

    const token = req.headers.token;
    const decoded = jwt.verify(token, "asfa3rt2qwef");

    if (decoded){
        req.user.Id = decoded.id;
        next()
    }else{
        res.status(403).json({
            message:"you are not signed in"
        })
    }

}

module.exports = {
    userMiddleware: userMiddleware
}