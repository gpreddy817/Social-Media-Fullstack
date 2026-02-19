const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: [true, "username already exists"],
        required: [true, "username required"]
    },
    email:{
        type: String,
        unique: [true, "email already exists"],
        required: [true, "email required"]
    },
    password:{
        type: String,
        required: [true, "password required"]
    },
    bio: String,
    profileImage:{
        type: String,
        default: "https://i.pinimg.com/736x/ae/59/cf/ae59cfb3afd5c3426bd270588334096c.jpg"
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
})

const userModel = mongoose.model("User", userSchema, "users") 

module.exports = userModel
