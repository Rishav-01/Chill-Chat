import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const url = import.meta.env.VITE_URL;
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ username, password, gender }) => {
    const success = handleInputErrors({ username, password, gender });
    if (!success) return;
    setLoading(true);

    try {
      const res = await axios.post(
        `${url}/api/auth/register`,
        {
          username,
          password,
          gender,
        },
        { withCredentials: true }
      );
      const data = await res.data;
      if (data.error) {
        throw new Error(data.error);
      }
      console.log(data);
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;

const handleInputErrors = ({ username, password, gender }) => {
  if (!username || !password || !gender) {
    toast.error("Please fill all the fields");
    return false;
  }
  return true;
};
