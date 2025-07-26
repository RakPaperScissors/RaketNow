import React from "react";

const DashboardCard = ({
  icon: Icon,
  title,
  items = [],
  ctaText,
  ctaLink = "#",
  bgGradient = "",
  textColor = "text-gray-800",
  isPromo = false,
}) => {
  return (
    <div
      className={`rounded-xl p-5 border transition-all duration-300 ${
        isPromo
          ? `bg-gradient-to-r ${bgGradient} ${textColor}`
          : "bg-[#F5F7F8] border-gray-200"
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        {Icon && <Icon className={`${isPromo ? "text-white" : "text-[#0C2C57]"}`} />}
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      {items.length > 0 && (
        <ul className="text-sm list-disc list-inside space-y-1">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}

      <a
        href={ctaLink}
        className={`mt-4 inline-block text-sm font-medium ${
          isPromo
            ? " text-white border border-white px-4 py-2 rounded-full font-semibold hover:bg-white hover:text-[#0C2C57]"
            : "text-orange-600 hover:text-[#0C2C57] px-4 py-2 "
        }`}
      >
        {ctaText}
      </a>
    </div>
  );
};

export default DashboardCard;
