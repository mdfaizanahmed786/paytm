import Heading from "../components/Heading";
import { useState, useContext } from "react";
import SubHeading from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import axios from "axios";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import AppContext from "./AppContext";

function Signin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setRequiredFirstname } = useContext(AppContext);

  const onSigninHandleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://paytm-j2ss.onrender.com/api/v1/user/signin",
        {
          username,
          password,
        }
      );
      const requiredFirstname = response.data.userName;
      toast.success("Sign in Successful", {
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
      setRequiredFirstname(requiredFirstname);
      localStorage.setItem("user", requiredFirstname);
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign in failed", error);
      toast.error("Sign in failed. Please try again later.", {
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
        <Heading label="Sign in" />
        <SubHeading subHeading="Enter your credentials to get access to your account" />
        <form onSubmit={onSigninHandleClick} className="space-y-4">
          <InputBox
            type="email"
            label="Email"
            placeHolder="johndoe12@gmail.com"
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
          label="Don't have an account? "
          to="/signup"
          link="Sign up"
        />
      </div>
    </div>
  );
}

export default Signin;
