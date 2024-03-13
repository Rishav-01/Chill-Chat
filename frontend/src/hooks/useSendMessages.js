import { useState } from "react";
import useConversation from "../zustand/useConversation";
import { toast } from "react-hot-toast";
import axios from "axios";

const useSendMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const url = import.meta.env.VITE_URL;

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${url}/api/messages/send/${selectedConversation._id}`,
        { message },
        { withCredentials: true }
      );
      const data = await res.data;
      if (data.error) {
        throw new Error(data.error);
      }
      setMessages([...messages, data]);
    } catch (error) {
      toast.error("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessages;
