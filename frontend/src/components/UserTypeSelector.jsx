import React from "react";

function UserTypeSelector({ setUserType, onNext }) {
  const handleSelect = (type) => {
    setUserType(type);
    onNext();
  };

  return (
    <div className="bg-white p-8 rounded shadow-md text-center">
      <h2 className="text-2xl font-semibold mb-4">Choose Account Type</h2>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => handleSelect("raketista")}
          className="bg-blue-500 text-white py-2 rounded"
        >
          Raketista
        </button>
        <button
          onClick={() => handleSelect("client")}
          className="bg-green-500 text-white py-2 rounded"
        >
          Client
        </button>
        <button
          onClick={() => handleSelect("organization")}
          className="bg-purple-500 text-white py-2 rounded"
        >
          Organization
        </button>
      </div>
    </div>
  );
}

export default UserTypeSelector;
