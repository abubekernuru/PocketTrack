const bcryptjs = require('bcryptjs');
const ErrorHandler = require("../utils/error");
const User = require('../model/user.model.js')


const register = async (req, res, next)=> {
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password || username==="" || email ==="" || password ===""){
            return next(ErrorHandler("All fields are required!", 401))
        }
        const hashedPw = await bcryptjs.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPw
        })
        await newUser.save();
        const {password: pw, ...rest}= newUser._doc;
        res.status(201).json(rest);
    } catch (error) {
        next(error)
    }
}

module.exports = {register}