import { useEffect } from "react";
import { useState } from "react";
import { InputBox } from "./InputBox";
import axios from "axios"
import { useNavigate } from "react-router-dom";
function UsersComp({signedUser}) {
   const [users, setUser] = useState([]);
   const [filter, setFilter] = useState("")
  useEffect(()=>{
    axios.get("https://paytm-j2ss.onrender.com/api/v1/user/bulk?filter=" + filter)
    .then(response => {
        setUser(response.data.user)
    })
  },[filter])
  const filteredUsers = users.filter(user => user.firstname !== signedUser);
  return (
    <div className="flex flex-col mt-5 ml-5">
      <InputBox label={"Users"} onChange={(e)=>setFilter(e.target.value)} placeHolder={"Search Users..."} />
      {
        filteredUsers && filteredUsers?.map(res=> <div key={res.id}><User user={res}/></div>)
      }
      
    </div>
  );
}

function User({ user }) {
  const navigate = useNavigate()
  const handleClick = () =>{
    navigate(`/send?id=${user._id}&firstName=${user.firstname}&lastName=${user.lastname}`)
  }
  return (
    <div className="flex flex-row mt-5 items-center">
      <div className="rounded-full border h-10 w-10 bg-slate-200 relative">
        <h1 className="text-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {user.firstname ? user.firstname[0] : ""}
        </h1>
      </div>
      <div className="flex-grow flex items-center justify-between m-2">
        <h1 className="mr-2">{user.firstname} {user.lastname}</h1>
        <button onClick={handleClick} className="bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 w-28 text-white rounded-md mt-2 py-1">Send Money</button>
  </div> 
    </div>
  );
}

export default UsersComp