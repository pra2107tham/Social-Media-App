import mongoose from "mongoose";

const dbConnect = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log('MongoDB connected !! DB HOST : ', connectionInstance.connection.host)
    } catch (error) {
        console.log("MONGODB connection error : ", error)
    }
}

export default dbConnect