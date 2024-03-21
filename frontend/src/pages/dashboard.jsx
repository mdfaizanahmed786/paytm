import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "./AppContext";
import axios from "axios";
import AppBar from "../components/AppBar";
import BalanceDispalyer from "../components/BalanceDisplayer";
import UsersComp from "../components/UsersComp";

function Dashboard() {
  const { requiredFirstname, setRequiredFirstname } = useAppContext();
  const location = useLocation();
  const [balance, setBalance] = useState("");

  const usersBalanceFetch = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3001/api/v1/accounts/balance", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const avlbal = response.data.balance;
    setBalance(avlbal.toFixed(2));
  };

  useEffect(() => {
    usersBalanceFetch();
    const name = localStorage.getItem("user");

    // Check if requiredFirstname is empty and local storage has a value
    if (!requiredFirstname && name) {
      setRequiredFirstname(name);
    }
  }, [requiredFirstname, setRequiredFirstname]);

  return (
    <>
      <AppBar letter={requiredFirstname} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto">
          <BalanceDispalyer currentBal={balance} />
          <UsersComp signedUser={requiredFirstname} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
