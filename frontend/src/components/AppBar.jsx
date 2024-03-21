import React from "react";
import { useNavigate } from "react-router-dom";

function AppBar({ letter }) {
  const navigate = useNavigate();
  const UserName = letter.charAt(0);
  const castedString = UserName.toUpperCase();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex border justify-between border-black shadow-md h-12 py-1 px-5 bg-white">
      <div className="flex h-full items-center">
        <h1 className="font-semibold">PayTM App</h1>
      </div>
      <div className="flex items-center">
        <h1 className="mr-2">Hello</h1>
        <div className="rounded-full border h-10 w-10 bg-slate-200 flex justify-center items-center">
          <h1 className="text-lg">{castedString}</h1>
        </div>
        <button
          onClick={logoutHandler}
          className="ml-2 bg-gray-800 rounded-lg text-white text-sm px-3 py-1"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default AppBar;
