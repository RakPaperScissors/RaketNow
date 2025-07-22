import React from "react";
import {
  BadgeCheck,
  TrendingUp,
  Search,
  FileCheck2,
} from "lucide-react";

const perks = [
  {
    title: "Verified Checkmark",
    description: "Gain credibility and trust with a visible verified badge on your profile.",
    icon: <BadgeCheck className="w-6 h-6 text-white" />,
  },
  {
    title: "Top Search Priority",
    description: "Appear first in search results so clients find your posts faster.",
    icon: <Search className="w-6 h-6 text-white" />,
  },
  {
    title: "Attach Certificates",
    description: "Showcase your skills and experience by uploading professional certifications.",
    icon: <FileCheck2 className="w-6 h-6 text-white" />,
  },
  {
    title: "Boost Visibility",
    description: "Get featured in top rakets and gain more clients and recognition.",
    icon: <TrendingUp className="w-6 h-6 text-white" />,
  },
];

const BoostPost = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 overflow-x-hidden">
      <div className="rounded-2xl bg-gradient-to-br from-[#1e2761] via-[#94480e] to-[#ff7c2b] text-white overflow-hidden">
        {/* Header */}
        <div className="px-6 py-8 text-center">
          <h1 className="text-3xl font-bold mb-2">
            Go Pro & Boost Your Rakets To Greater Heights
          </h1>
          <p className="text-white/90">
            Unlock premium features to increase your credibility, reach, and success!
          </p>
        </div>

        {/* Perks Section */}
        <div className="px-6 grid gap-4 pb-6">
          {perks.map((perk, idx) => (
            <div
              key={idx}
              className=" border border-white text-white rounded-xl p-5 flex items-start space-x-4 "
            >
              <div className=" p-2 rounded-md">{perk.icon}</div>
              <div>
                <h2 className="text-lg font-semibold">{perk.title}</h2>
                <p className="text-sm text-white">{perk.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="px-6 py-6 text-center">
          <button className="bg-white text-[#0C2C57] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            Upgrade to Pro
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoostPost;
