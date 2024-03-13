import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, messages, setMessages } = useConversation();
  const url = import.meta.env.VITE_URL;

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${url}/api/messages/${selectedConversation._id}`,
          { withCredentials: true }
        );
        const data = await res.data;
        setMessages(data);
        if (data.error) {
          throw new Error(data.error);
        }
      } catch (error) {
        toast.error("Some Error  Occured");
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation._id, setMessages]);

  return { loading, messages };
};

export default useGetMessages;
