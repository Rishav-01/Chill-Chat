import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_URL;
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    const success = handleInputErrors({ username, password });
    if (!success) return;
    try {
      const res = await axios.post(
        `${url}/api/auth/login`,
        { username, password },
        { withCredentials: true }
      );
      const data = await res.data;
      console.log(data);
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;

const handleInputErrors = ({ username, password }) => {
  if (!username || !password) {
    toast.error("Please fill all the fields");
    return false;
  }
  return true;
};
