import { useLocation } from "react-router-dom";
export const SendMoney = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const firstName = params.get("firstName");
  const lastName = params.get("lastName");

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="bg-white h-[450px] mt-20 w-[450px] py-5">
        <div className="font-bold text-3xl flex justify-center items-center">
          Sending Money(Rs)
        </div>
        <div className="left-[180px] top-[30px] rounded-full border h-20 w-20 bg-slate-200 relative">
          <h1 className="text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {firstName[0]}
          </h1>
        </div>
        <div className="flex mt-14 justify-center items-center font-semibold text-lg">
          To, {firstName} {lastName}
        </div>
        <div className="flex justify-center items-center mt-7">
          <input
            type="number"
            required
            className="border-2 outline-none w-fit text-xl my-2 text-center px-1 py-1 mx-2 rounded-full"
            placeholder="Enter the Amount"
            min="1"
          />
        </div>
        <div className="flex justify-center items-center mt-10">
        <button className="bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 w-52 text-white rounded-md mt-5 py-2">Pay Now</button>
        </div>
      </div>
    </div>
  );
};
