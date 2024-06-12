import { Router } from "express";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import bodyParser from "body-parser";


const profileRouter = Router()

profileRouter.post("/data", async(req,res) => {
    try {
        const { userID } = req.body;
        const user = await Post.countDocuments({ userID });
        const userData = await User.findOne({ _id: userID })
        console.log("USerData", userData)
        const profileData = {
            posts: user,
            followers: userData.followers,
            followings: userData.followings
        }
        res.status(200).json(profileData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

profileRouter.post('/follow', async(req,res) => {
    try {
        const { userID, followerId } = req.body;
        console.log("Getting", req.body)
        const updatedUser = await User.findOneAndUpdate(
            { _id: userID },
            { $push: { followersList: followerId }, $inc: { followings: 1 } },
            { new: true } // This option ensures that the updated document is returned
        );

        console.log("updatedUser", updatedUser)
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

profileRouter.post('/like', async (req,res) => {
    try {
        const { _id, userID } = req.body;
        console.log("Getting", req.body);

        // Check if the user has already liked the post
        const userLiked = await Post.findOne({ _id: _id, likedUser: userID });

        if (userLiked) {
            const updatedUser = await Post.findOneAndUpdate(
                { _id: _id, likedUser: userID },
                { $pull: { likedUser: userID }, $inc: { likes: -1 } }, 
                { new: true }
            );

            console.log("updatedUser dec", updatedUser);
            res.status(200).json(updatedUser);
        } else {
            // If the user has not already liked the post, increase the likes count
            const updatedUser = await Post.findOneAndUpdate(
                { _id: _id },
                { $push: { likedUser: userID }, $inc: { likes: 1 } },
                { new: true }
            );

            console.log("updatedUser inc", updatedUser);
            res.status(200).json(updatedUser);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})


export default profileRouter;