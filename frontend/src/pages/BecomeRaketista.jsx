import React, { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import { useApplyRaketista } from "../hooks/useApplyRaketista";
import { useAuth } from "../context/AuthContext";
import { getAllSkills } from "../api/profile";
import { useNavigate } from "react-router-dom";

function BecomeRaketista() {
  const [collapsed, setCollapsed] = useState(() => {
    const stored = localStorage.getItem("sidebarCollapsed");
    return stored === "true";
  });
  const { user } = useAuth();
  const [bio, setBio] = useState("");
  const { apply, loading: applying, error, success } = useApplyRaketista();
  const [allSkills, setAllSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skills = await getAllSkills();
        setAllSkills(skills);
      } catch (err) {
      }
    };

    fetchSkills();
  }, []);

  const handleAddSkill = (skillId) => {
    if (!selectedSkills.includes(skillId)) {
      setSelectedSkills((prev) => [...prev, skillId]);
    }
  };

  const handleRemoveSkill = (skillId) => {
    setSelectedSkills((prev) => prev.filter((id) => id !== skillId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.uid) return;

    if (!bio.trim()) {
      setFormError("Please enter your bio.");
      return;
    }

    if (selectedSkills.length === 0) {
      setFormError("Please select at least one skill.");
      return;
    }

    const result = await apply(user.uid, bio, selectedSkills);
    if (!result) return;

    if (result) {
      navigate("/profile", { replace: true });
      window.location.reload();
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className={`${collapsed ? "w-20" : "w-64"} h-screen fixed top-0 left-0 z-50 transition-all duration-200`}>
        <SideNav collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      <main
        className={`flex-1 relative min-h-screen overflow-y-auto transition-all duration-200 px-16 py-16 flex items-center justify-center ${
          collapsed ? "md:ml-20" : "md:ml-64"
        } ml-20`}
      >

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
              <select
                id="skills"
                className="w-full border border-gray-300 rounded-md px-4 py-3 focuse:outline-none focus:ring-[#ff7c2b]"
                // value=""
                onChange={(e) => {
                  const skillId = parseInt(e.target.value, 10);
                  if (!isNaN(skillId)) handleAddSkill(skillId);
                }}
                value=""
              >
                <option value="">--- Select a skill ---</option>
                {allSkills.map((skill) => (
                  <option key={skill.skill_Id} value={skill.skill_Id}>
                    {skill.skillName} ({skill.category})
                  </option>
                ))}
              </select>

              {/* Displaye selected skills */}
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedSkills.map((id) => {
                  const skill = allSkills.find((s) => s.skill_Id === id);
                  return (
                    <span
                      key={id}
                      className="bg-[#0c2c57]/10 text-[#0c2c57] px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {skill?.skillName || "Unknown Skill"}
                      <button
                        onClick={() => handleRemoveSkill(id)}
                        className="text-[#0c2c57] hover:text-red-500 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* MESSAGES */}
            {error && (
              <p className="mb-4 text-sm text-red-500">{error}</p>
            )}
            {success && (
              <p className="mb-4 text-sm text-green-500">Application submitted!</p>
            )}
            {formError && (
              <p className="text-red-500 text-sm mb-2">{formError}</p>
            )}

            <div className="flex justify-end gap-4">
              <button
                className="px-6 py-2 rounded-md border border-gray-300 text-[#0c2c57] hover:bg-gray-100"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 rounded-md bg-[#ff7c2b] text-white hover:bg-[#e76c21]"
                onClick={handleSubmit}
                disabled={applying}
              >
                {applying ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BecomeRaketista;
