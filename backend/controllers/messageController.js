import conversationModel from "../models/Conversation.js";
import messageModel from "../models/Message.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { recieverId } = req.params;

    const senderId = req.user._id;

    let conversations = await conversationModel.findOne({
      participants: {
        $all: [senderId, recieverId],
      },
    });

    if (!conversations) {
      conversations = await conversationModel.create({
        participants: [senderId, recieverId],
      });
    }

    const newMessage = new messageModel({
      senderId,
      recieverId,
      message,
    });

    if (newMessage) {
      conversations.messages.push(newMessage._id);
    }

    await conversations.save();
    await newMessage.save();

    // Socket Functionality
    const recieverSocketId = getRecieverSocketId(recieverId);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Server error occurred" });
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { recieverId } = req.params;
    const senderId = req.user._id;

    const conversations = await conversationModel
      .findOne({
        participants: { $all: [senderId, recieverId] },
      })
      .populate("messages");

    if (!conversations) {
      return res.status(200).json([]);
    }
    const messages = conversations.messages;

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Server error occurred" });
  }
};
