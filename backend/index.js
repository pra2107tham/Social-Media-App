import dbConnect from "./db/dbConnect.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
    path: './.env'
})
dbConnect()
.then(() => {
    app.on('error', (error) => {
        console.error('Express app encountered an error:', error);
    });
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`)
    })    
})
.catch((err) => {
    console.log('MONGODB connected failed !!!', err)
})