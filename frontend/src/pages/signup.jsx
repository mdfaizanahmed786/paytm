import { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { ToastContainer, toast, Bounce } from "react-toastify";
import axios from "axios";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onSignupHandleClick = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3001/api/v1/user/signup",
      {
        username,
        firstname,
        lastname,
        password,
      }
    );
    toast.success('Sign up Successful', {
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
    navigate("/dashboard");
  };
  
  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="rounded-lg bg-white w-[400px] p-6">
        <Heading label="Sign up" />
        <SubHeading subHeading="Enter your information to create an account" />
        <form onSubmit={onSignupHandleClick}>
          <InputBox
            type="text"
            label="First Name"
            placeHolder="John"
            onChange={(e) => setFirstname(e.target.value)}
          />
          <InputBox
            type="text"
            label="Last Name"
            placeHolder="Doe"
            onChange={(e) => setLastname(e.target.value)}
          />
          <InputBox
            type="email"
            label="Email"
            placeHolder="johndoe12@gmail.com"
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputBox
            type="password"
            label="Password"
            placeHolder="123456"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" label="Sign up" />
          </form>
        <BottomWarning
          label="Already have an account? "
          to="/signin"
          link="Sign in"
        />
      </div>
    </div>
  );
}

export default Signup;
