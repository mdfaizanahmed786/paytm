import AppBar from "../components/AppBar";
import BalanceDispalyer from "../components/BalanceDisplayer";
import UsersComp from "../components/UsersComp";

function Dashboard() {
  return (
    <>
      <AppBar letter={"chef"} />
      <div className="max-w-[560px] mx-auto">
      <BalanceDispalyer currentBal={"10,000"} />
      <UsersComp />
      </div>
    </>
  );
}

export default Dashboard;
