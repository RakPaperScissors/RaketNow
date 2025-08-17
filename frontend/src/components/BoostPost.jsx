// import React from "react";
// import { BadgeCheck, TrendingUp, Search, FileCheck2 } from "lucide-react";

// const perks = [
//   {
//     title: "Verified Checkmark",
//     description:
//       "Gain credibility and trust with a visible verified badge on your profile.",
//     icon: <BadgeCheck className="w-5 h-5 text-white" />,
//   },
//   {
//     title: "Top Search Priority",
//     description:
//       "Appear first in search results so clients find your posts faster.",
//     icon: <Search className="w-5 h-5 text-white" />,
//   },
//   {
//     title: "Attach Certificates",
//     description:
//       "Showcase your skills and experience by uploading professional certifications.",
//     icon: <FileCheck2 className="w-5 h-5 text-white" />,
//   },
//   {
//     title: "Boost Visibility",
//     description:
//       "Get featured in top rakets and gain more clients and recognition.",
//     icon: <TrendingUp className="w-5 h-5 text-white" />,
//   },
// ];

// const BoostPost = () => {
//   return (
//     <div className="max-w-4xl mx-auto p-4 overflow-x-hidden">
//       <div className="rounded-2xl bg-gradient-to-br from-[#1e2761] via-[#94480e] to-[#ff7c2b] text-white overflow-hidden">
//         {/* Header */}
//         <div className="px-4 py-6 text-center">
//           <h1 className="text-2xl md:text-3xl font-bold mb-1">
//             Go Pro & Boost Your Rakets
//           </h1>
//           <p className="text-sm md:text-base text-white/90">
//             Unlock premium features to increase your credibility, reach, and
//             success!
//           </p>
//         </div>

//         {/* Perks Section */}
//         <div className="px-8 grid gap-4 pb-4">
//           {perks.map((perk, idx) => (
//             <div
//               key={idx}
//               className="border border-white text-white rounded-xl p-4 flex items-start gap-3"
//             >
//               <div className="p-1 rounded-md">{perk.icon}</div>
//               <div>
//                 <h2 className="text-base font-semibold">{perk.title}</h2>
//                 <p className="text-xs md:text-sm text-white">
//                   {perk.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Button */}
//         <div className="px-4 py-4 text-center">
//           <button className="bg-white text-[#0C2C57] px-5 py-2.5 text-sm md:text-base rounded-full font-semibold hover:bg-gray-100 transition">
//             Upgrade to Pro
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BoostPost;

import React from "react";

function BoostPost() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="w-full max-w-5xl bg-gradient-to-b from-[#0C2C57] to-[#FF7C2B] text-white rounded-2xl shadow-xl p-6 sm:p-10 text-center">
        <h1 className="text-2xl sm:text-4xl font-bold mb-2">🚀 Boost Post</h1>
        <p className="text-base sm:text-lg mb-6 opacity-90">
          Unlock premium features to increase your credibility, reach, and
          success!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <div className="border border-white/40 rounded-xl p-4">
            <h2 className="font-semibold">Verified Checkmark</h2>
            <p className="text-sm opacity-80">
              Gain credibility and trust with a visible verified badge on your
              profile.
            </p>
          </div>

          <div className="border border-white/40 rounded-xl p-4">
            <h2 className="font-semibold">Top Search Priority</h2>
            <p className="text-sm opacity-80">
              Appear first in search results so clients find your posts faster.
            </p>
          </div>

          <div className="border border-white/40 rounded-xl p-4">
            <h2 className="font-semibold">Attach Certificates</h2>
            <p className="text-sm opacity-80">
              Showcase your skills and experience by uploading professional
              certifications.
            </p>
          </div>

          <div className="border border-white/40 rounded-xl p-4">
            <h2 className="font-semibold">Boost Visibility</h2>
            <p className="text-sm opacity-80">
              Get featured in top rakets and gain more clients and recognition.
            </p>
          </div>
        </div>

        <button
          disabled
          className="mt-8 px-6 py-3 bg-white text-[#0C2C57] font-semibold rounded-full shadow-md cursor-not-allowed opacity-80"
        >
          Coming Soon on RaketNow!
        </button>
      </div>
    </div>
  );
}

export default BoostPost;
