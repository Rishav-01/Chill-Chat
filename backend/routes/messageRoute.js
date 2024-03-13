import express from "express";
import { getMessages, sendMessage } from "../controllers/messageController.js";
import protectRoute from "../middleware/protectRoute.js";

const messageRouter = express.Router();

// all routes are after /api/messages

messageRouter.get("/:recieverId", protectRoute, getMessages); // fetch all messages between sender and reciever
messageRouter.post("/send/:recieverId", protectRoute, sendMessage);

export default messageRouter;
