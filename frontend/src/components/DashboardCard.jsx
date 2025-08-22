import React from "react";

const DashboardCard = ({
  icon: Icon,
  title,
  items = [],
  ctaText,
  ctaLink = "#",
  isPromo = false,
}) => {
  return (
    <div
      className={`rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 bg-white`}
    >
      <div className="flex items-center gap-3 mb-4">
        {Icon && <Icon className="text-[#0C2C57]" />}
        <h2 className="text-lg font-semibold text-[#0C2C57]">{title}</h2>
      </div>

      {items.length > 0 && (
        <ul className="text-sm text-gray-700 space-y-1 mb-4">
          {items.map((item, index) => (
            <li key={index} className="list-disc list-inside">
              {item}
            </li>
          ))}
        </ul>
      )}

      <a
        href={ctaLink}
        className="inline-block text-sm font-medium text-orange-600 hover:text-[#0C2C57]"
      >
        {ctaText}
      </a>
    </div>
  );
};

export default DashboardCard;
