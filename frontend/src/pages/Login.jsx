import React from "react";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import LoginButton from "../components/LoginButton";
import GoogleLoginButton from "../components/GoogleLoginButton";

function Login() {
  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#FF7C2B]">Login</h2>
          <p className="text-xs mt-4 text-[#000000]">
            If you are already a member, easily log in
          </p>

          <form className="flex flex-col gap-4">
            <EmailInput />
            <PasswordInput />
            <LoginButton />
          </form>

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          <GoogleLoginButton />

          <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
            <a href="#">Forgot your password?</a>
          </div>

          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>Don't have an account?</p>
            <button className="py-2 px-4 bg-white border rounded-xl hover:scale-105 duration-300">
              Register
            </button>
          </div>
        </div>

        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl"
            src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
            alt="Login visual"
          />
        </div>
      </div>
    </section>
  );
}

export default Login;
