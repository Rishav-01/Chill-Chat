import React from "react";
import { useAuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation";
import { extractTime } from "../utils/extractTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePicture
    : selectedConversation?.profilePicture;
  const buubleBg = fromMe ? "bg-blue-500" : "";
  const formattedDate = extractTime(message.createdAt);
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="Chat bubble" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${buubleBg} pb-2 ${shakeClass}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedDate}
      </div>
    </div>
  );
};

export default Message;
