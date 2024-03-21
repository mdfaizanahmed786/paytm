import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useAppContext } from "./AppContext";

export const SendMoney = () => {
  const [amount, setAmount] = useState(0);
  const location = useLocation();
  const { requiredFirstname } = useAppContext();
  const params = new URLSearchParams(location.search);
  const firstName = params.get("firstName");
  const id = params.get("id");
  const lastName = params.get("lastName");
  const navigate = useNavigate();

  const transerferringBalance = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "https://paytm-j2ss.onrender.com/api/v1/accounts/transfer",
        {
          to: id,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
      toast.promise(
        resolveAfter3Sec,
        {
          pending: 'Transaction in Process...',
          success: 'Transaction Successful!',
          error: 'Transaction was failed...'
        }
      );
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      console.error("there was internal error", error);
      const rejectAfter3Sec = new Promise((_, reject) => setTimeout(reject, 3000));

      toast.promise(
        rejectAfter3Sec,
        {
          pending: 'Transaction in Process...',
          error: 'Transaction failed...',
          success: 'Transaction Successful!',
        }
      );
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="font-bold text-3xl flex justify-center items-center">
            Sending Money(₹)
          </div>
          <div className="rounded-full border h-20 w-20 bg-slate-200 mx-auto mt-10 flex justify-center items-center">
            <h1 className="text-3xl">{firstName[0]}</h1>
          </div>
          <div className="flex mt-5 justify-center items-center font-semibold text-lg">
            To, {firstName} {lastName}
          </div>
          <div className="flex justify-center items-center mt-5">
            <input
              type="number"
              required
              className="border-2 outline-none w-full max-w-md text-xl my-2 text-center px-1 py-1 mx-2 rounded-full"
              placeholder="Enter the Amount"
              min="1"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-center items-center mt-8">
            <button
              onClick={transerferringBalance}
              className="bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 w-full max-w-md text-white rounded-md mt-5 py-2"
            >
              Pay Now
            </button>
            <Link to="/dashboard" className="w-full max-w-md">
              <button className="bg-white focus:outline-none border border-gray-300 text-gray-800 rounded-md mt-3 py-2 hover:bg-gray-100 focus:ring focus:border-gray-500 w-full">
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
