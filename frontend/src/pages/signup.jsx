import Heading from "../components/Heading";
import { useState, useContext } from "react";
import SubHeading from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { ToastContainer, toast, Bounce } from "react-toastify";
import axios from "axios";
import Button from "../components/Button";
import AppContext from "./AppContext";
import BottomWarning from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const { setRequiredFirstname } = useContext(AppContext);
  const navigate = useNavigate();

  const onSignupHandleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://paytm-j2ss.onrender.com/api/v1/user/signup",
        {
          username,
          firstname,
          lastname,
          password,
        }
      );
      toast.success("Sign up Successful", {
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
      setRequiredFirstname(firstname);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", firstname);
      navigate(`/dashboard`);
    } catch (error) {
      console.error("Sign up failed", error);
      toast.error("Sign up failed. Please try again later.", {
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
    }
  };

  return (
    <div className="bg-slate-300 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <Heading label="Sign up" />
        <SubHeading subHeading="Enter your information to create an account" />
        <div className="border border-gray-300 p-4 rounded-lg">
          <form onSubmit={onSignupHandleClick} className="space-y-4">
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
        </div>
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
