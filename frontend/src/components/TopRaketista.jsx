import React from "react";
import { Star } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";
import Miguel from "../assets/images/raketnow-logo.png";
import Ana from "../assets/images/raketnow-logo.png";
import Maria from "../assets/images/raketnow-logo.png";
import { useRaketistas } from "../hooks/useRaketistas";


// Filler data muna but go backend
// const raketistas = [
//   {
//     name: "Miguel Santos",
//     role: "Web Developer",
//     rating: 4.9,
//     skills: ["PHP", "Laravel", "React"],
//     img: Miguel,
//   },
//   {
//     name: "Ana Reyes",
//     role: "Graphic Designer",
//     rating: 4.7,
//     skills: ["Photoshop", "Illustrator"],
//     img: Ana,
//   },
//   {
//     name: "David Cruz",
//     role: "UI/UX Designer",
//     rating: 5.0,
//     skills: ["Figma", "XD", "Sketch"],
//     img: "", // placeholder fallback
//   },
//   {
//     name: "Maria Gonzales",
//     role: "Content Writer",
//     rating: 4.2,
//     skills: ["SEO", "Blogs"],
//     img: Maria,
//   },
//   {
//     name: "Maria Gonzales",
//     role: "Content Writer",
//     rating: 4.2,
//     skills: ["SEO", "Blogs"],
//     img: Maria,
//   },
// ];



const TopRaketista = () => {
  const { raketistas, loading, message } = useRaketistas();
  
  const handleOpenUserProfile = (uid) => {
    const profilePageUrl = `/profile-display/${uid}`;
    window.open(profilePageUrl, '_blank');
  };
  
  if (loading) return <LoadingSpinner />;
  if (message) return <p className="p-4 text-red-500">{message}</p>;

  return (
    <section className="bg-[#F9FAFB] px-4 py-8">
      <div className="flex justify-start items-center mb-6">
        <h2 className="text-xl font-semibold text-[#0C2C57]">
          Top Raketistas
        </h2>
      </div>

      {/* Horizontal scroll container */}
      <div className="relative">
        <div className="flex overflow-x-auto gap-6 pb-2 scroll-smooth scrollbar-hide pl-4 pr-1">
          {raketistas
            .slice()
            .sort((a, b) => b.rating - a.rating)
            .map((r, index) => (
            <div
              key={index}
              className="min-w-[250px] max-w-[250px] bg-white rounded-2xl shadow-md p-5 flex-shrink-0 flex flex-col items-center text-center "
            >
              {/* Profile image */}
              <div className="w-20 h-20 rounded-full border-4 border-orange-500 overflow-hidden mb-3" 
              onClick={() => handleOpenUserProfile(r.id)}>
                {r.img ? (
                  <img src={r.img} 
                  alt={r.name} 
                  onError={(e) => (e.target.src = "/default_profile.jpg")} 
                  className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>

              {/* Name and Role */}
              <h3 className="text-base font-semibold text-[#0C2C57]" onClick={() => handleOpenUserProfile(r.id)} >{r.name}</h3>
              <p className="text-sm text-gray-600 capitalize">{r.type}</p>

              {/* Rating */}
              <div className="flex items-center justify-center mt-2">
                {[...Array(Math.floor(parseFloat(r.rating) || 0))].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
                {r.rating % 1 !== 0 && (
                  <Star size={16} className="text-yellow-400 fill-yellow-200" />
                )}
                <span className="text-xs text-gray-600 ml-1">({r.rating})</span>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {r.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRaketista;
