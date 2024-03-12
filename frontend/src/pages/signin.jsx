import Heading from "../components/Heading";
import { useState } from "react";
import SubHeading from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { useNavigate } from "react-router-dom";
import {toast, Bounce} from "react-toastify"
import axios from "axios";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
function Signin() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onSigninHandleClick = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3001/api/v1/user/signin",
      {
        username,
        password,
      }
    );
    toast.success('Sign in Successful', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
    localStorage.setItem("token", response.data.token);
    navigate("/dashboard")
  };
  return (
    <div className="bg-slate-300 h-screen  flex justify-center">
      <div className="bg-white rounded-lg w-[430px] p-5 mt-[100px] mb-[150px]">
        <Heading label="Sign in" />
        <SubHeading subHeading="Enter your credentials to get access to your account" />
        <form onSubmit={onSigninHandleClick}>
          <InputBox
            type="email"
            label="Email"
            placeHolder="johndoe12@gmial.com"
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputBox
            type="password"
            label="Password"
            placeHolder="1234"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" label="Sign in" />
        </form>
        <BottomWarning
          label="Don't have a account? "
          to="/signup"
          link="Sign up"
        />
      </div>
    </div>
  );
}

export default Signin;
