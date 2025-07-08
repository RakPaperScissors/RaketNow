import React, { useState } from "react";
import UserTypeSelector from "../components/UserTypeSelector";
import UserInfoForm from "../components/UserInfoForm";

function Signup() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState(""); // "raketista" | "client" | "organization"
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    orgName: "",
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {step === 1 && (
        <UserTypeSelector setUserType={setUserType} onNext={nextStep} />
      )}
      {step === 2 && (
        <UserInfoForm
          userType={userType}
          formData={formData}
          setFormData={setFormData}
          onBack={prevStep}
          onSubmit={() => {
            console.log("Submit data:", { userType, ...formData });
            // handle form submission
          }}
        />
      )}
    </div>
  );
}

export default Signup;
