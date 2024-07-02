import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import cookieParser from 'cookie-parser'; 
import userRoute from "./routes/user.route.js"
import messageRoute from "./routes/message.route.js"
import getUsers from "./routes/getUsers.route.js"


const app=express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
})

app.use("/api/auth",userRoute);
app.use("/api/message",messageRoute);
app.use("/api/users", getUsers);

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})