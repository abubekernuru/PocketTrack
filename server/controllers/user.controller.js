const ErrorHandler = require("../utils/error");
const User = require("../model/user.model.js");
const bcryptjs = require("bcryptjs");


const updateUser = async (req, res, next)=>{
    try {
        const {userId} = req.params;
        if (!userId) {
            return next(new ErrorHandler("User ID is required!", 400));
        }
        if(userId !== req.user.id){
            return next(new ErrorHandler("You are not allowed to update this user!", 401));
        }
        if(req.body.password){
            if(req.body.password.length < 8){
                return next(new ErrorHandler("Password must be at least more than eight characters.", 403))
            }
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updateFields = {
            username: req.body.username,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
        };

        if (req.body.password) {
            updateFields.password = req.body.password;
        }
        const update = await User.findByIdAndUpdate(
            userId,
            { $set: updateFields }, 
            {new: true, runValidators: true });

        if (!update) {
            return next(new ErrorHandler("User not found!", 404));
        }
        const {password: pass, ...rest} = update._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next)=> {
    try {

        const { userId } = req.params;
        if (!userId) {
            return next(new ErrorHandler("User ID is required!", 400));
        }
        if(req.user.id !== userId && !req.user.isAdmin){
            return next(new ErrorHandler("You are not allowed to delete this user!", 401));
        }

        await User.findByIdAndDelete(userId);
        if (req.user.id === userId) {
            res.clearCookie("access_token");
        }
        res.status(200).json("User deleted succefully!")
    } catch (error) {
        next(error)
    }
}

const logoutUser = async (req, res, next)=> {
    try {
        res.clearCookie("access_token");
        res.status(200).json("User logged out succefully!")
    } catch (error) {
        next(error)
    }
}

const getUsers = async (req, res, next)=> {
    try {
        if (!req.user.isAdmin) {
            return next(new ErrorHandler("You are not allowed to see users data!", 403));
        }
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === "asc" ?1: -1;

        const users = await User.find()
        .sort({createdAt: sortDirection})
        .skip(startIndex)
        .limit(limit);

        const totalUsers = await User.countDocuments()

        const usersWithoutPw = users.map((user)=>{
            const {password, ...rest} = user._doc;
            return rest;
        })

        res.status(200).json({users: usersWithoutPw, totalUsers})
    } catch (error) {
        next(error)
    }
}

module.exports = {updateUser, deleteUser, logoutUser, getUsers}