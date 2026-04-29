const ErrorHandler = require("../utils/error");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifyUser = (req, res, next)=>{
    try {
        const token = req.cookies.access_token;
        if(!token){
            return next(new ErrorHandler("Unauthorized", 401))
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            if(err){
                return next(new ErrorHandler("Token is not valid", 403))
            }
            req.user = decoded;
            next()
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { verifyUser }