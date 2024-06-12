import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import User from "./models/userModel.js";

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.static("public"))


//routes import
import usersRouter from "./routes/users.routes.js"
import profileRouter from "./routes/profile.routes.js"
import postsRouter from "./routes/posts.routes.js"

app.use("/api/auth", usersRouter)
app.use("/api/profile", profileRouter)
app.use("/api/posts", postsRouter)
app.get("/api/fetchUsers", async (req, res) => {
    try {
        // Check if the user exists
        const user = await User.find();

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export {app}