import React from "react";

function UserInfoForm({ userType, formData, setFormData, onBack, onSubmit }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Complete Your Details</h2>

      {userType === "organization" && (
        <input
          type="text"
          name="orgName"
          placeholder="Organization Name"
          value={formData.orgName}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
      )}

      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />

      <div className="flex justify-between mt-4">
        <button onClick={onBack} className="text-gray-500 hover:underline">
          Back
        </button>
        <button
          onClick={onSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default UserInfoForm;
