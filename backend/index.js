import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import authRouter from "./routes/authRoute.js";
import mongoose from "mongoose";
import messageRouter from "./routes/messageRoute.js";
import userRouter from "./routes/userRoute.js";
import { app, server } from "./socket/socket.js";
config();

const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: [process.env.FRONTEND],
    httpOnly: true,
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND);
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(cookieParser());
app.use(express.json());

// Custom Middlewares
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.json("HI");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(
    server.listen(port, () => {
      console.log(`Database connected and server is running on port ${port}`);
    })
  )
  .catch((err) => console.log(err));
