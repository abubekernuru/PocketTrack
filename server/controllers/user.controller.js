const ErrorHandler = require("../utils/error");
const User = require("../model/user.model.js");
const bcryptjs = require("bcryptjs");


const updateUser = async (req, res, next)=>{
    try {
        const {userId} = req.params;
        if(userId !== req.user.id){
            return next(new ErrorHandler("You are not allowed to update this user!", 401));
        }
        if(req.body.password){
            if(req.body.password.length < 8){
                return next(new ErrorHandler("Password must be at least more than eight characters.", 403))
            }
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        const update = await User.findByIdAndUpdate(userId, {
            $set:{
                username: req.body.username,
                email: req.body.email,
                profilePicture: req.body.profilePicture,
                password: req.body.password,
            }
        }, {new: true});
        const {password: pass, ...rest} = update._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error);
    }
}

module.exports = {updateUser}