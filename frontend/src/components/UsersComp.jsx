import React from "react";
import { useState } from "react";
import { InputBox } from "./InputBox";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
 function UsersComp() {
 
  const [user, setUser] = useState([{
    firstName: "Faizan",
    lastName: "Ahmed",
    _id: "1",
  },
  {
    firstName: "Nouman",
    lastName: "Ahmed",
    _id: "2",
  },
  {
    firstName: "George",
    lastName: "Chao",
    _id: "3",
  }]);
  return (
    <div className="flex flex-col mt-5 ml-5">
      <InputBox label={"Users"} placeHolder={"Search Users..."} />
      {
      user.map(users=> <div key={users.id}><User user={users}/></div>)
      }
      
    </div>
  );
}

function User({ user }) {
  const navigate = useNavigate()
  const handleClick = () =>{
    navigate(`/send?firstName=${user.firstName}&lastName=${user.lastName}`)
  }
  return (
    <div className="flex flex-row mt-5 items-center">
      <div className="rounded-full border h-10 w-10 bg-slate-200 relative">
        <h1 className="text-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {user.firstName[0]}
        </h1>
      </div>
      <div className="flex-grow flex items-center justify-between m-2">
        <h1 className="mr-2">{user.firstName} {user.lastName}</h1>
        <button onClick={handleClick} className="bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 w-28 text-white rounded-md mt-2 py-1">Send Money</button>
      </div>
    </div>
  );
}

export default UsersComp