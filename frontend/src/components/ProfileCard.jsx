import React from "react";
import { Mail, User, Hammer, Pencil } from "lucide-react";

function ProfileCard() {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto mt-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="https://randomuser.me/api/portraits/lego/6.jpg"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-bold">Liarrah Lambayao</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs font-medium">
                Raketista
              </span>
              <span>• Joined May 2023</span>
            </div>
            <div className="flex items-center text-gray-600 mt-1">
              <Mail className="w-4 h-4 mr-1" />
              <span>liarrahright?@up.edu.ph</span>
            </div>
          </div>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2">
          <Pencil className="w-4 h-4" />
          Edit Profile
        </button>
      </div>

      <div className="border-t border-gray-300 mt-6 pt-4">
        <h3 className="text-lg font-semibold mb-1 text-orange-500 flex items-center gap-2">
          <User className="w-5 h-5" />
          Bio
        </h3>
        <p className="text-gray-700">
          Experienced web developer with 5+ years of experience building
          responsive and user-friendly applications. Passionate about clean code
          and intuitive user interfaces. Currently focused on frontend
          development with React and exploring new technologies in the web
          development ecosystem.
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 text-orange-500 flex items-center gap-2">
          <Hammer className="w-5 h-5" />
          Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "JavaScript",
            "React",
            "Node.js",
            "CSS3",
            "Tailwind CSS",
            "UI/UX Design",
            "Responsive Design",
            "Git",
            "maoy",
          ].map((skill) => (
            <span
              key={skill}
              className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
