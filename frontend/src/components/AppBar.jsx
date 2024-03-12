import React from "react";

function AppBar({ letter }) {
  const UserName = letter.charAt(0);
  const castedString = UserName.toUpperCase();
  return (
    <div className="flex border justify-between border-black shadow-md h-12 py-1 px-5">
      <div className="flex h-full items-center">
        <h1 className="font-semibold">PayTM App</h1>
      </div>
      <h1 className="absolute left-[1420px] mt-2 flex justify-center items-center">Hello</h1>
      <div className="flex rounded-full border h-10 w-10 bg-slate-200 items-center relative">
        <h1 className="text-lg absolute left-1/2 transform -translate-x-1/2">{castedString}</h1>
      </div>
    </div>
  );
}

export default AppBar;
