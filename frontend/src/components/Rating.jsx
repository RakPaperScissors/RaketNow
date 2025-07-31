import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { submitRating } from "../api/ratings";

export default function StarRating({ raketId, initialRating = 0, alreadyRated = false }) {
  const [rating, setRating] = useState(initialRating); 
  const [hover, setHover] = useState(0); 
  const [isLocked, setIsLocked] = useState(alreadyRated); // locked if already rated from backend

  useEffect(() => {
    setIsLocked(alreadyRated);
    setRating(initialRating);
  }, [alreadyRated, initialRating]);

  const handleClick = async (value) => {
    if (isLocked) return; // stop if already rated
    setRating(value);
    setIsLocked(true);

    try {
      await submitRating(raketId, value);
      console.log("Rating submitted:", value);
    } catch (error) {
      console.error("Error submitting rating:", error);
      setIsLocked(false); // unlock if failed
    }
  };

  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {[1, 2, 3, 4, 5].map((starValue) => (
        <Star
          key={starValue}
          size={24}
          onClick={() => handleClick(starValue)}
          onMouseEnter={() => setHover(starValue)}
          onMouseLeave={() => setHover(0)}
          style={{
            cursor: isLocked ? "default" : "pointer",
            color: starValue <= (hover || rating) ? "gold" : "lightgray",
          }}
        />
      ))}
    </div>
  );
}
