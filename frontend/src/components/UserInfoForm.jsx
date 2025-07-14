import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

function UserInfoForm({ userType, formData, setFormData, onBack, onSubmit }) {
  // for password and validation stuff
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    number: false,
    special: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const password = formData.password || "";
    setPasswordValid({
      length: password.length > 3,
      number: /\d/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    });
  }, [formData.password]);

  const handleSubmit = () => {
    const { password, confirmPassword } = formData;

    if (passwordValid.length && passwordValid.number && passwordValid.special) {
      if (password === confirmPassword) {
        onSubmit();
      } else {
        alert("Passwords do not match.");
      }
    } else {
      alert(
        "Password must:\n- Be at least 4 characters\n- Include at least one number\n- Include at least one special character"
      );
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Complete Your Details
        </h2>

        <form onSubmit={(e) => e.preventDefault()}>
          {userType === "organization" && (
            <input
              type="text"
              name="orgName"
              placeholder="Organization Name"
              value={formData.orgName}
              onChange={handleChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          )}

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          {/* PASSWORD STUFF */}
          <div className="relative mb-2">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* REQSSS */}
          <ul className="text-sm text-gray-600 mb-4 pl-5 list-disc">
            <li className={passwordValid.length ? "text-green-600" : ""}>
              At least 4 characters
            </li>
            <li className={passwordValid.number ? "text-green-600" : ""}>
              Includes a number
            </li>
            <li className={passwordValid.special ? "text-green-600" : ""}>
              Includes a special character
            </li>
          </ul>

          {/* CONFIRM */}
          <div className="relative mb-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-500"
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={onBack}
              className="text-gray-500 hover:text-blue-500 transition font-medium"
            >
              ← Back
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default UserInfoForm;
