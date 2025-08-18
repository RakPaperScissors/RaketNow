import React, { useState } from "react";
import RaketCard from "./RaketCard";
import { ListFilter } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Mockup from "../assets/images/raketnow-mockup.png";
import Sample from "../assets/images/raketnow-logo.png";
import { useRakets } from "../hooks/useRakets";
import LoadingSpinner from "./LoadingSpinner";

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

const RaketFeed = ({ searchTerm }) => {
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

  const filteredRakets = rakets.filter((raket) => {
    if (["accepted", "in_progress", "completed", "cancelled"].includes(raket.status)) {
      return false;
    }

    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(raket.category);

    const matchesSearch =
      !searchTerm ||
      raket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      raket.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

    // selectedCategories.length === 0
    //   ? rakets
    //   : rakets.filter((raket) => selectedCategories.includes(raket.category));

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
          <LoadingSpinner />
        ) : error ? (
          <p className="text-center text-sm text-red-500">{error}</p>
        ) : filteredRakets.length > 0 ? (
          filteredRakets.map((raket) => (
          <RaketCard 
            key={raket.raketId}
            raketId={raket.raketId}
            status={raket.status}
            images={
              raket.pictures?.length > 0
                ? raket.pictures.map(p => p.imageUrl)
                : ["/default_profile.jpg"]
            }
            title={raket.title || "Untitled Raket"}
            description={raket.description || "No description provided."}
            budget={raket.budget || 0}
            user={raket.user || { firstName: "Unknown", lastName: "User" }}
            postedAt={formatDistanceToNow(new Date(raket.dateCreated), { addSuffix: true })}
            location={"Davao City"}
            rating={0}
            category={raket.category || "General"}
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
