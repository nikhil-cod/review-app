import "./App.css";
import Navbar from "./components/user/Navbar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ForgetPassword from "./components/auth/ForgetPassword";
import ConfirmPassword from "./components/auth/ConfirmPassword";
import EmailVerification from "./components/auth/EmailVerification";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth/signin" element={<SignIn/>} />
        <Route path="/auth/signup" element={<SignUp/>} />
        <Route path="/auth/forget-password" element={<ForgetPassword/>} />
        <Route path="/auth/confirm-password" element={<ConfirmPassword/>} />
        <Route path="/auth/email-verification" element={<EmailVerification/>} />
      </Routes>
    </>
  );
}

export default App;
