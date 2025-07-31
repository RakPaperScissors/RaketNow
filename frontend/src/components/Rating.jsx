import React, { useState } from "react";
import { submitRating } from "../api/ratings";

export default function StarRating({ userId, raketId }) {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRatingClick = async (value) => {
    setRating(value);
    try {
      await submitRating(userId, raketId, value);
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit rating", err);
    }
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleRatingClick(star)}
          disabled={submitted}
        >
          <span className={star <= rating ? "text-yellow-500" : "text-gray-400"}>
            ★
          </span>
        </button>
      ))}
    </div>
  );
}
