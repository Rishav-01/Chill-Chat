import React, { useContext } from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../hooks/useLogout";
import { AuthContext } from "../context/AuthContext";

const LogoutButton = () => {
  const { logout, loading } = useLogout();
  const { authUser } = useContext(AuthContext);
  return (
    <div className="mt-auto">
      {!loading ? (
        <div className="flex justify-between items-center">
          <BiLogOut
            size={20}
            onClick={logout}
            className="cursor-pointer text-white"
          />
          <p className="text-xs md:text-sm lg:text-base">
            Logged In as {authUser.username}
          </p>
        </div>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogoutButton;
