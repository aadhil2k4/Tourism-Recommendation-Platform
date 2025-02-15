import express from "express";
import { connectDB } from "./db/connectDB.js";
import dotenv from "dotenv";

const app = express()
dotenv.config();

app.get("/", (req,res)=>{
    res.send("Hello World!");
})

app.listen(3000, ()=>{
    connectDB();
    console.log("Server running on port 3000");
})