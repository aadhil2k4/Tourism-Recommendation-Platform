import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        console.log("MongoURI: ", process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection error: ", error.message);
        process.exit(1);
    }
}
