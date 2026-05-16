const bcryptjs = require('bcryptjs');
const ErrorHandler = require("../utils/error");
const User = require('../model/user.model.js');
const jwt = require('jsonwebtoken');


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

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if(!email || !password || email === "" || password === ""){
            return next(new ErrorHandler("All fields are required!", 401))
        }
        const user = await User.findOne({email});
        if(!user){
            return next(new ErrorHandler("User not found", 404));
        }
        const isMatch = bcryptjs.compareSync(password, user.password);
        if(!isMatch){
            return next(new ErrorHandler("Invalid credentials", 401))
        }
        const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn: '7d'});
        const {password: pw, ...rest} = user._doc;
        res.status(200).cookie('access_token', token, {httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000}).json(rest)
    } catch (error) {
        next(error)
    }
}

const checkUser = async (req, res, next)=>{
    res.json({ userId: req.user.id, username: req.user.username });
}

module.exports = {register, login, checkUser}