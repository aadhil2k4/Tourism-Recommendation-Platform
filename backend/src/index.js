import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./db/connectDB.js";

import authRoutes from "./routes/auth.Route.js";
import quizRoutes from "./routes/quiz.Route.js";
import destinationRoutes from "./routes/destination.Route.js";
import wishListRoutes from "./routes/wishlist.Route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/wishlist", wishListRoutes);

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
    connectDB();
})