import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: {
        type: String,
        unique: true
    },
    password: String,
    followings: {
        type: Number,
        default: 0
    },
    followers: {
        type: Number,
        default: 0
    },
    followersList: [{
        type: String,
        default: 0
    }]
})

const User = new mongoose.model('User', userSchema);

export default User;