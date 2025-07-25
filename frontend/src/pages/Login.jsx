import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import LoginButton from "../components/LoginButton";
import GoogleLoginButton from "../components/GoogleLoginButton";
import logo from "../assets/images/raketnow-logo.png";

import { useLoginForm } from "../hooks/useLoginForm";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { email, password, setEmail, setPassword, handleLogin } = useLoginForm();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    handleLogin(e, async () => {
      await login();
      window.location.href = "/home";
    });
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 rounded-2xl shadow-lg w-full max-w-md p-8">
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

        <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74] text-center">
          <a href="#">Forgot your password?</a>
        </div>

        <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
          <p>Don't have an account?</p>
          <button
            onClick={() => navigate("/signup")}
            className="py-2 px-4 bg-white border rounded-xl hover:scale-105 duration-300"
          >
            Register
          </button>
        </div>
      </div>
    </section>
  );
}

export default Login;
