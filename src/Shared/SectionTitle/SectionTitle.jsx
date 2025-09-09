import React from "react";

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="text-center my-5">
      {/* Subheading */}
      <p className="text-lg font-semibold text-orange-400 tracking-wide mb-2">
        {subHeading}
      </p>

      {/* Divider Top */}
      <div className="flex items-center justify-center mb-3">
        <div className="w-16 h-[2px] bg-orange-400"></div>
      </div>

      {/* Heading */}
      <h3 className="text-3xl md:text-2xl font-bold uppercase mb-3">
        {heading}
      </h3>

      {/* Divider Bottom */}
      <div className="flex items-center justify-center mt-1">
        <div className="w-24 h-[3px] bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default SectionTitle;
