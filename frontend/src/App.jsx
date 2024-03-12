import { BrowserRouter, Route, Routes} from "react-router-dom";
import Signup from "./pages/signup";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signin from "./pages/signin";
import Dashboard from "./pages/dashboard";
import { SendMoney } from "./pages/send";
function App() {

  return (
    <div>
   <BrowserRouter>
   <Routes>
   <Route path="/signup" element={<Signup />} />
   <Route path="/signin" element={<Signin/>} />
   <Route path="/dashboard" element={<Dashboard/>} />
  <Route path="/send" element={<SendMoney/>} />
   </Routes>
   </BrowserRouter>
   <ToastContainer />
    </div>
  )
}

export default App
