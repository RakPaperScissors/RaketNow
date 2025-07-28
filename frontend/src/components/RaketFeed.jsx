import React, { useState } from "react";
import RaketCard from "./RaketCard";
import { ListFilter } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Mockup from "../assets/images/raketnow-mockup.png";
import Sample from "../assets/images/raketnow-logo.png";
import { useRakets } from "../hooks/useRakets";

const CATEGORIES = [
  "Maintenance & Repair",
  "Tech & Electronics",
  "Personal & Home Care",
  "Events & Entertainment",
  "Food & Beverage",
  "Education & Tutoring",
  "Graphic & Digital Design",
  "Business & Professional Services",
  "Automotive",
  "Moving & Delivery Services",
];

// const jobs = [
//   {
//     images: [Mockup, Sample],
//     title: "Plumbing Services for Leaky Faucet",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, tempora Lorem ipsum dolor sit amet. Sit molestiae voluptates est voluptatem quasi aut ratione unde ab reiciendis eligendi sit reiciendis voluptas hic expedita odio. At dicta error 33 voluptatem illum eos itaque nesciunt aut dolor molestiae et dignissimos animi in recusandae quibusdam. In voluptatem ullam aut molestias voluptate qui doloribus sequi.Est fugit itaque hic autem cupiditate ut voluptatum ipsa nam eligendi quos. Et enim rerum eum velit nisi qui dolorum voluptas 33 suscipit rerum aut sint omnis. Vel magni velit 33 veniam voluptatem est ducimus fugiat.",
//     budget: 850,
//     user: "Xander Jay",
//     postedAt: "1h ago",
//     location: "Davao City",
//     rating: 4.8,
//     category: "Maintenance & Repair",
//   },
//   {
//     images: ["https://via.placeholder.com/300x200", "https://via.placeholder.com/300x201"],
//     title: "Build a Personal Website",
//     description: "Need someone to build my portfolio site using React or Next.js.",
//     budget: 10000,
//     user: "Jhaye Marie",
//     postedAt: "3h ago",
//     location: "Matina",
//     rating: 5,
//     category: "Tech & Electronics",
//   },
// ];


const RaketFeed = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { rakets, loading, error } = useRakets();

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const removeCategory = (cat) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== cat));
  };

  const clearAll = () => setSelectedCategories([]);

  const filteredRakets =
    selectedCategories.length === 0
      ? rakets
      : rakets.filter((raket) => selectedCategories.includes(raket.category));

  return (
    <main className="bg-[#F9FAFB] min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-[#0C2C57]">Browse Rakets Now</h1>
        </div>

        {/* Filters Section */}
        <div className="bg-[#F9FAFB] p-4 relative">
          {/* Filter button and Clear All */}
          <div className="flex items-center gap-4 flex-wrap mb-3 relative">
            <div className="relative inline-block text-left">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full bg-white text-sm text-[#0C2C57] hover:bg-gray-100 transition"
              >
                <ListFilter className="w-4 h-4" />
                Filters
              </button>

              {/* Dropdown menu */}
              {showDropdown && (
                <div className="absolute mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10 p-3">
                  {CATEGORIES.filter((cat) => !selectedCategories.includes(cat)).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategories((prev) => [...prev, cat]);
                        setShowDropdown(false); // close after select
                      }}
                      className="block w-full text-left px-2 py-1 text-sm text-[#0C2C57] hover:bg-gray-100 rounded"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Clear all button */}
            {selectedCategories.length > 0 && (
              <button
                onClick={clearAll}
                className="text-sm text-[#FF7C2B] rounded-full hover:bg-gray-100 px-3 py-1"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Category tags */}
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((cat) => {
              const colorMap = {
                "Maintenance & Repair": "bg-yellow-100 text-yellow-800",
                "Tech & Electronics": "bg-blue-100 text-blue-800",
                "Personal & Home Care": "bg-pink-100 text-pink-800",
                "Events & Entertainment": "bg-purple-100 text-purple-800",
                "Food & Beverage": "bg-red-100 text-red-800",
                "Education & Tutoring": "bg-green-100 text-green-800",
                "Graphic & Digital Design": "bg-indigo-100 text-indigo-800",
                "Business & Professional Services": "bg-orange-100 text-orange-800",
                "Automotive": "bg-gray-200 text-gray-800",
                "Moving & Delivery Services": "bg-teal-100 text-teal-800",
              };

              return (
                <span
                  key={cat} 
                  className={`flex items-center gap-2 px-3 py-1 text-xs rounded-full ${colorMap[cat]}`}
                >
                  {cat}
                  <button
                    onClick={() => removeCategory(cat)}
                    className="hover:text-red-500 text-sm"
                  >
                    ✕
                  </button>
                </span>
              );
            })}
          </div>
        </div>


        {/* Feed */}
        {loading ? (
          <p className="text-center text-sm text-gray-500">Loading rakets...</p>
        ) : error ? (
          <p className="text-center text-sm text-red-500">{error}</p>
        ) : filteredRakets.length > 0 ? (
          filteredRakets.map((raket) => (
          <RaketCard 
            key={raket.raketId}
            images={
              raket.pictures.length > 0
                ? raket.pictures
                : ["/default_profile.jpg"]
            }
            title={raket.title || "Untitled Raket"}
            description={raket.description || "No description provided."}
            budget={raket.budget || 0}
            user={
              raket.user
                ? `${raket.user.firstName || ""} ${raket.user.lastName || ""}`.trim()
                : "Unknown User"
            }
            postedAt={formatDistanceToNow(new Date(raket.dateCreated), { addSuffix: true })}
            location={"Davao City"}
            rating={0}
            category={"General"}
            />))
        ) : (
          <p className="text-center text-sm text-gray-500">
            No rakets found for selected categories.
          </p>
        )}
        {/* {filteredJobs.length > 0 ? (
          filteredJobs.map((job, idx) => <RaketCard key={idx} {...job} />)
        ) : (
          <p className="text-center text-sm text-gray-500">
            No rakets found for selected categories.
          </p>
        )} */}
      </div>
    </main>
  );
};

export default RaketFeed;
