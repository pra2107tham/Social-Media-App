import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    imgPath: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    format:{
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    liked: {
        type: Boolean,
        default: false
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likedUser: [{
        type: String,
        default: 0
    }]  
})

const postModel = new mongoose.model('Post', postSchema);

export default postModel;