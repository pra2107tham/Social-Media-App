import { Router } from "express";
import User from "../models/userModel.js";
import bodyParser from "body-parser";


const usersRouter = Router()

usersRouter.post("/signup", async(req,res) => {
    try {
        const { firstName, lastName, username, password } = req.body;
        // Validate input (e.g., check if required fields are provided)

        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(401).json({ error: 'Username already exists' });
        }

        // Create a new user
        const newUser = new User({ firstName, lastName, username, password });

        // Save the user to the database
        const savedUser = await newUser.save();

        res.status(200).json({savedUser},{ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

usersRouter.post("/login", async(req,res) => {
    try {
        const { username, password } = req.body;
        console.log("data", req.body)
        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        // Check if the password matches
        if (user.password !== password) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        console.log(user)
        res.status(200).json({ message: "Login successful", data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

export default usersRouter;