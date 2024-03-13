import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const url = import.meta.env.VITE_URL;

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${url}/api/users`, {
          withCredentials: true,
        });
        const data = await res.data;
        // console.log(data);                                 // Object of users / conversations
        setConversations(data);
        if (data.error) {
          throw new Error(data.error);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
