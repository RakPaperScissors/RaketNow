import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { submitRating } from "../api/ratings";

export default function StarRating({
  raketId,
  initialRating = 0,
  alreadyRated = false,
  readOnly = false
}) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  const [isLocked, setIsLocked] = useState(alreadyRated || readOnly);

  useEffect(() => {
    setIsLocked(alreadyRated || readOnly);
    setRating(initialRating);
  }, [alreadyRated, initialRating, readOnly]);

  const handleClick = async (value) => {
    if (isLocked) return;
    setRating(value);
    setIsLocked(true);

    try {
      await submitRating(raketId, value);
    } catch (error) {
      console.error("Error submitting rating:", error);
      setIsLocked(false);
    }
  };

  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {[1, 2, 3, 4, 5].map((starValue) => {
        const isFilled = readOnly
          ? starValue <= rating
          : starValue <= (hover || rating);

        return (
          <Star
            key={starValue}
            size={20}
            onClick={() => !isLocked && handleClick(starValue)}
            onMouseEnter={() => !isLocked && setHover(starValue)}
            onMouseLeave={() => !isLocked && setHover(0)}
            style={{
              cursor: isLocked ? "default" : "pointer",
              color: isFilled ? "gold" : "lightgray"
            }}
          />
        );
      })}
    </div>
  );
}
