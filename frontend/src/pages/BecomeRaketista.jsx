import React, { useState } from "react";
import SideNav from "../components/SideNav";

function BecomeRaketista() {
  const [bio, setBio] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);

  // smthn para maging "badge/chip" sa skills
  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && skillInput.trim()) {
      e.preventDefault();
      const newSkill = skillInput.trim().replace(/,+$/, "");
      if (!skills.includes(newSkill)) {
        setSkills([...skills, newSkill]);
      }
      setSkillInput("");
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideNav />

      <main className="flex-1 p-8 flex justify-center">
        <div className="w-full max-w-3xl">
          <h1 className="text-2xl font-bold text-[#0c2c57] mb-2">
            Ready to become a <span className="text-[#ff7c2b]">Raketista</span>?
          </h1>
          <p className="text-gray-600 mb-8">
            A Raketista badge will be added to your profile as well as a
            showcase of your personal bio and skills.
          </p>

          <div className="bg-white shadow-sm rounded-xl p-8">
            {/* BIO */}
            <div className="mb-6">
              <label
                htmlFor="bio"
                className="block font-semibold text-[#0c2c57] mb-2"
              >
                Add Bio
              </label>
              <textarea
                id="bio"
                rows="4"
                maxLength={150}
                placeholder="Max 150 Characters."
                className="w-full border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#ff7c2b]"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>

            {/* SKILLSSS */}
            <div className="mb-6">
              <label
                htmlFor="skills"
                className="block font-semibold text-[#0c2c57] mb-2"
              >
                Add Skills
              </label>
              <input
                id="skills"
                type="text"
                placeholder="E.g., Video Editor, Developer, Gardener"
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff7c2b]"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {/* eskelz */}
              <div className="flex flex-wrap gap-2 mt-4">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-[#0c2c57]/10 text-[#0c2c57] px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(index)}
                      className="text-[#0c2c57] hover:text-red-500 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button className="px-6 py-2 rounded-md border border-gray-300 text-[#0c2c57] hover:bg-gray-100">
                Cancel
              </button>
              <button className="px-6 py-2 rounded-md bg-[#ff7c2b] text-white hover:bg-[#e76c21]">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BecomeRaketista;
