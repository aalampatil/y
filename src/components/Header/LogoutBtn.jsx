import React from "react";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      onClick={logoutHandler}
    >
      Log out
    </button>
  );
}

export default LogoutBtn;
