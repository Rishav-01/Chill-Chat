import axios from "axios";
import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_URL;
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${url}/api/auth/logout`, "", {
        withCredentials: true,
      });
      const data = await res.data;
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("chat-user");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;
