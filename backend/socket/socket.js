import { Server } from "socket.io";
import http from "http";
import express from "express";
import { config } from "dotenv";
config();

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND],
    methods: ["GET", "POST"],
  },
});

export const getRecieverSocketId = (recieverId) => {
  return userSocketMap[recieverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  // console.log("New client connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") {
    userSocketMap[userId] = socket.id;
  }

  // send event to all connected users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    // console.log(`Client disconnected ${socket.id}`);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
