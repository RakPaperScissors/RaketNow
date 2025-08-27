import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react"; 
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import LoginButton from "../components/LoginButton";
import GoogleLoginButton from "../components/GoogleLoginButton";
import logo from "../assets/images/raketnow-logo.png";

import { useLoginForm } from "../hooks/useLoginForm";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { email, password, setEmail, setPassword, message, messageType, handleLogin } = useLoginForm();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    handleLogin(e, async () => {
      await login();
      window.location.href = "/home";
    });
  };

  return (
    <section className="bg-[#F9FAFB] min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 relative">
        {/* Return to Previous Page Button (top-left corner) */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
        >
          <ArrowLeft size={20} className="text-[#0C2C57]" />
        </button>

        <div className="flex justify-center mb-1">
          <img
            src={logo}
            alt="RaketNow Logo"
            className="h-12 md:h-14 w-auto object-contain"
          />
        </div>
        <h2 className="font-bold text-2xl text-[#FF7C2B] text-center">Login</h2>
        <p className="text-xs mt-2 text-[#000000] text-center">
          If you are already a member, easily log in
        </p>

        {message && (
          <div
            className={`text-sm text-center mt-2 p-2 rounded-md ${
              messageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <EmailInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoginButton />
        </form>

        <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
          <hr className="border-gray-400" />
          <p className="text-center text-sm">OR</p>
          <hr className="border-gray-400" />
        </div>

        <GoogleLoginButton />

        {/* <div className="mt-5 text-xs py-4 text-[#002D74] text-center">
          <a href="#">Forgot your password?</a>
        </div> */}

        <div className="mt-6 text-xs flex justify-between items-center text-[#002D74] border-t border-[#002D74]">
          <p>Don't have an account?</p>
          <button
            onClick={() => navigate("/signup")}
            className="py-2 px-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors duration-300"
          >
            Register
          </button>
        </div>

        {/* Return to Landing Page Button with Home Icon */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300"
          >
            <Home size={18} /> Return to Home
          </button>
        </div>
      </div>
    </section>
  );
}

export default Login;
