import React, { useRef } from "react";
import { IoIosSend } from "react-icons/io";
import useSendMessages from "../hooks/useSendMessages";

const MessageInput = () => {
  const message = useRef();
  const { sendMessage, loading } = useSendMessages();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.current.value) return;
    await sendMessage(message.current.value);
    message.current.value = "";
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          ref={message}
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-500 text-white outline-none"
          placeholder="Send a message.."
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <IoIosSend />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
