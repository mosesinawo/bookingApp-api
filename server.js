import express from "express";
import dotenv from 'dotenv'
import { connectDB } from "./config/connectDB.js";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser";
import cors from "cors"


const app = express()
connectDB()

app.get("/", (req, res) => {
    res.send("hello")
})
app.use(cors({
    origin: ['http://localhost:3000','http://localhost:3001' ], // Adjust this to match your frontend's origin
    credentials: true, // Allow cookies and credentials
}));

//middlewares
app.use(cookieParser())

app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})


const PORT = process.env.PORT || 8000
app.listen(PORT, () =>{
    console.log((`backend running on port ${PORT}`))
})  