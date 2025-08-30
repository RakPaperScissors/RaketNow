import React from "react";

function EmailInput({ value, onChange}) {
  return (
    <input
      className="p-2 w-full mt-8 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 transition"
      type="email"
      name="email"
      placeholder="Email"
      value={value}
      onChange={onChange}
    />
  );
}

export default EmailInput;
