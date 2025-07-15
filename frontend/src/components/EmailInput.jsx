import React from "react";

function EmailInput({ value, onChange}) {
  return (
    <input
      className="p-2 mt-8 rounded-xl border"
      type="email"
      name="email"
      placeholder="Email"
      value={value}
      onChange={onChange}
    />
  );
}

export default EmailInput;
