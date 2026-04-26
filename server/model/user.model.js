const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String, 
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    profilePicture:{
        type: String,
        default: "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
    }

}, {timestamps: true})

const User = mongoose.model("User", userSchema);
module.exports = User;