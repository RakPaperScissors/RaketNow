import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function PasswordInput({ value, onChange}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="relative">
      <input
        className="p-2 rounded-xl border w-full pr-10"
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Password"
        value={value}
        onChange={onChange}
      />
      <div
        onClick={togglePassword}
        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </div>
    </div>
  );
}

export default PasswordInput;
