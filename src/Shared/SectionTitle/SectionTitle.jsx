import React from "react";

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div>
      <div className="text-center my-3">
        <p className="text-yellow-400">{subHeading}</p>
        
        <h3 className="text-2xl uppercase ">{heading}</h3>
      </div>
    </div>
  );
};

export default SectionTitle;
