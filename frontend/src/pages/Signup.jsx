import React, { useState } from "react";
import UserTypeSelector from "../components/UserTypeSelector";
import UserInfoForm from "../components/UserInfoForm";

import { useSignUp } from "../hooks/useSignUp";

function Signup() {
  const { form, setForm, handleChange, handleSubmit, message } = useSignUp();

  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState(""); // raketista, client, or organization

  const nextStep = (selectedType) => {
    setUserType(selectedType);
    setForm((prev) => ({
      ...prev,
      role: selectedType,
      organizationName: selectedType === "organization" ? prev.organizationName : "",
    }));
    setStep(2);
  };
  
  const prevStep = () => setStep(1);

  const handleFormDataChange = (e) => {
    handleChange(e);
  };

  const handleUserInfoSubmit = () => {
    handleSubmit();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {step === 1 && (
        <UserTypeSelector setUserType={setUserType} onNext={nextStep} />
      )}
      {step === 2 && (
        <UserInfoForm
          userType={userType}
          formData={form}
          setFormData={setForm}
          onBack={prevStep}
          onSubmit={handleUserInfoSubmit}
          onChange={handleFormDataChange}
          message={message}
        />
      )}
    </div>
  );
}

export default Signup;
