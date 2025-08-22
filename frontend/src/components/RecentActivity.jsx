// ############################################################
// COMPONENT IN USE IF POV OF SOMEONE ELSE VIEWING YOUR PROFILE
// ############################################################

import React, { useEffect, useRef, useState } from "react";
import { Briefcase } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function RecentActivity({ rakets = [] }) {
  const listRef = useRef(null);
  const [maxHeightPx, setMaxHeightPx] = useState(null);

  // Measure the height of the first 5 items (including vertical spacing)
  useEffect(() => {
    function measure() {
      if (!listRef.current) return;
      const items = listRef.current.querySelectorAll("[data-activity-item]");
      if (items.length >= 5) {
        let total = 0;
        // Tailwind `space-y-4` = 1rem gap = 16px (default)
        const gapPx = 16;
        for (let i = 0; i < 5; i++) {
          total += items[i].offsetHeight;
          if (i < 4) total += gapPx; // add gaps between the first 5 items
        }
        setMaxHeightPx(total);
      } else {
        setMaxHeightPx(null);
      }
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [rakets.length]);

  const shouldScroll = rakets.length > 5 && maxHeightPx;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto my-10">
      <h2 className="text-lg text-[#0c2c57] font-semibold mb-4">
        Recent activity
      </h2>

      <div
        ref={listRef}
        className={`space-y-4 ${shouldScroll ? "overflow-y-auto pr-2" : ""}`}
        style={shouldScroll ? { maxHeight: `${maxHeightPx}px` } : undefined}
      >
        {rakets.length > 0 ? (
          rakets.map((raket, index) => (
            <div
              key={index}
              data-activity-item
              className="flex items-center space-x-3"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-[#ff7c2b] rounded-full flex items-center justify-center">
                <Briefcase className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">
                  {raket.title}
                </p>
                <p className="text-xs text-gray-500">
                  Posted{" "}
                  {formatDistanceToNow(new Date(raket.dateCreated), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 text-sm py-6 italic">
          No rakets completed yet. 🌱
        </div>
        )}
      </div>
    </div>
  );
}
