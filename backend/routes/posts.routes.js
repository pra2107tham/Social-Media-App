import { Router } from "express";
import multer from "multer";
import fs from "fs";
import postModel from "../models/postModel.js";
const postsRouter = Router();

var upload = multer({ dest: "./uploads" });

function generateRandomNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}

postsRouter.get("/fetchAllPosts", async (req, res) => {
  try {
    console.log("Fetching all posts");
    const data = await postModel.find();
    const modifiedData = await Promise.all(
      data.map((post) => {
        // Read the video file content
        const newObj = { ...post };
        const videoContent = fs.readFileSync(post.imgPath);
        console.log("Path", post.imgPath);
        // Convert the video content to base64
        const base64Video = videoContent.toString("base64");
        newObj.postBase64 = base64Video;
        return newObj;
      })
    );
    res.status(200).send(modifiedData);
  } catch (err) {
    console.log("Error ", err);
    res.status(500).send({ message: err });
  }
});

postsRouter.post("/upload", upload.array("images", 5), (req, res) => {
  try {
    const imageBlob = req.body.images;
    const imageName = `${req.body.name}`;
    const userID = req.body.userID;

    // Create directory if it doesn't exist
    const uploadDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    // Construct image path
    const randomSixDigitNumber = generateRandomNumber();

    const imagePath = path.join(
      uploadDir,
      `${imageName}-${randomSixDigitNumber}.png`
    );
    let base64Image = imageBlob.split(";base64,").pop();

    // Write image data to file
    fs.writeFile(
      imagePath,
      base64Image,
      { encoding: "base64" },
      async (err) => {
        if (err) {
          console.error("Error saving image:", err);
          return res.status(500).send("Failed to save image.");
        }
        const postdata = new postModel({
          imgPath: imagePath,
          name: imageName,
          format: "image",
          userID: userID,
          desc: req.body.desc,
          likes: req.body.likes,
          liked: req.body.liked,
        });
        await postdata.save();

        console.log("Image saved successfully:", imagePath);
        res.status(200).send("Image uploaded successfully.");
      }
    );
  } catch (err) {
    console.log("Error ", err);
    res.status(500).send({ message: err });
  }
});

postsRouter.post("/upload/video", upload.array("videos", 5), (req, res) => {
  try {
    console.log("Uploading video"); 
    const imageName = `${req.body.name}`;
    const userID = req.body.userID;

    // Create directory if it doesn't exist
    const uploadDir = path.join(__dirname, "uploads/video");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    // Construct image path
    const randomSixDigitNumber = generateRandomNumber();

    const imagePath = path.join(
      uploadDir,
      `${imageName}-${randomSixDigitNumber}.mp4`
    );
    let base64Image = imageBlob.split(";base64,").pop();

    // Write image data to file
    fs.writeFile(
      imagePath,
      base64Image,
      { encoding: "base64" },
      async (err) => {
        if (err) {
          console.error("Error saving video:", err);
          return res.status(500).send("Failed to save video.");
        }
        const postdata = new postModel({
          imgPath: imagePath,
          name: imageName,
          format: "video",
          userID: userID,
          desc: req.body.desc,
          likes: req.body.likes,
          liked: req.body.liked,
        });
        await postdata.save();

        console.log("Video saved successfully:", imagePath);
        res.status(200).send("Video uploaded successfully.");
      }
    );
  } catch (err) {
    console.log("Error ", err);
    res.status(500).send({ message: err });
  }
});

export default postsRouter;
