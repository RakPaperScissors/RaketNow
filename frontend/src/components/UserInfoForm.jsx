import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import TOSModal from "./TOSModal";
import EmailVerificationModal from "./EmailVerificationModal";
import { useEmailVerification } from "../hooks/useEmailVerification";

function UserInfoForm({
  userType,
  formData,
  setFormData,
  onBack,
}) {

    const {
    loading,
    error,
    message,
    showVerificationModal,
    setShowVerificationModal,
    handleRegister,
    handleVerify,
    handleResend,
    clearError,
  } = useEmailVerification();

  // for password and validation stuff
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    number: false,
    special: false,
  });

  const [acceptedTOS, setAcceptedTOS] = useState(false);
  const [showTOS, setShowTOS] = useState(false);

  // error modal
  const [errorMessage, setErrorMessage] = useState("");

  // email verification modal
  const [showVerification, setShowVerification] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    if (!acceptedTOS) {
      setErrorMessage(
        "Please read and agree to our Terms & Conditions before signing up."
      );
      return;
    }

    if (!passwordValid.length || !passwordValid.number || !passwordValid.special) {
      clearError("Password must meet all requirements.");
      return;
    }
    if (password !== confirmPassword) {
      clearError("Passwords do not match.");
      return;
    }
    handleRegister(formData);
  };

  const handleVerifyCode = (code) => {
    handleVerify(formData.email, code);
  };

  // Callback for the resend button in the modal
  const handleResendCode = () => {
    handleResend(formData.email);
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Complete Your Details
        </h2>

        {message && <p className="mb-4 text-center font-medium text-green-600">{message}</p>}
        {error && <p className="mb-4 text-center font-medium text-red-600">{error}</p>}

        <form onSubmit={handleSubmit}>
          {userType === "organization" && (
            <input
              type="text"
              name="organizationName"
              placeholder="Organization Name"
              value={formData.organizationName}
              onChange={handleChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-grey-300 transition"
            />
          )}

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-grey-300 transition"
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-grey-300 transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-grey-300 transition"
          />

          {/* PASSWORD */}
          <div className="relative mb-2">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-grey-300 transition"
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

          {/* REQUIREMENTS */}
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

          {/* CONFIRM PASSWORD */}
          <div className="relative mb-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-grey-300 transition"
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

          {/* TERMS & CONDITIONS */}
          <div className="flex items-center mb-6 text-sm">
            <input
              type="checkbox"
              id="tos"
              checked={acceptedTOS}
              onChange={(e) => setAcceptedTOS(e.target.checked)}
              className="mr-2 w-4 h-4 text-[#ff7c2b] focus:ring-[#ff7c2b] border-gray-300 rounded"
            />
            <label htmlFor="tos" className="text-gray-600">
              I agree to the{" "}
              <button
                type="button"
                className="text-[#ff7c2b] underline"
                onClick={() => setShowTOS(true)}
              >
                Terms & Conditions
              </button>
            </label>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onBack}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200 font-medium"
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#ff7c2b] hover:bg-[#ff7c2b]/90 text-white px-4 py-2 rounded-xl font-semibold transition"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>

      {/* MODALS */}
      {showTOS && <TOSModal onClose={() => setShowTOS(false)} />}
      {errorMessage && (
        <ErrorModal
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}
      {showVerificationModal && (
        <EmailVerificationModal
          email={formData.email}
          onVerify={handleVerifyCode}
          onClose={() => setShowVerificationModal(false)} // Use the setter from the hook
          onResend={handleResendCode}
          loading={loading}
          message={message}
          error={error}
        />
      )}
    </section>
  );
}

export default UserInfoForm;
