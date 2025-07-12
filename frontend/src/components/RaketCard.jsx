import React, { useState } from "react";

const JobCard = ({
    image,
    title,
    description,
    budget,
    user,
    postedAt,
    location,
    rating,
    featured,
}) => {
    const [expanded, setExpanded] = useState(false);
    const maxChars = 100;

    const isLong = description.length > maxChars;
    const displayedText =
        expanded || !isLong ? description : description.slice(0, maxChars) + "...";

    return (
        <div className="relative bg-white rounded-xl shadow-md overflow-hidden w-full h-[350px] flex flex-col">
            {/* Image */}
            <img src={image} alt={title} className="w-full h-36 object-cover" />

            {/* Featured Badge */}
            {featured && (
                <span className="absolute top-3 right-3 bg-[#DCEAFA] text-[#0C2C57] text-xs px-2 py-1 rounded-full font-semibold">
                    ★ Featured
                </span>
            )}

            {/* Content */}
            <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                    <h2 className="font-semibold text-lg text-[#0C2C57] mb-1 truncate">{title}</h2>


                    <p className="text-sm text-gray-600 mb-2">
                        {displayedText}
                        {isLong && (
                            <a
                                href={``} 
                                className="ml-1 text-xs text-[#0C2C57] font-semibold underline"
                            >
                                See more
                            </a>
                        )}
                    </p>

                </div>

                <div className="mt-auto flex flex-col gap-2">
                    {/* Posted info */}
                    <div className="text-xs text-gray-500">
                        <p>
                            Posted by:{" "}
                            <span className="font-medium text-[#0C2C57]">{user}</span>
                        </p>
                        <p>
                            {postedAt} • {location}
                        </p>
                    </div>

                    {/* Budget + Rating */}
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-[#FF7C2B] font-bold">₱{budget}</span>
                        <span className="text-yellow-500 font-semibold">★ {rating}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
