import React from "react";
import { Link } from "react-router-dom";

const Cover = ({ img, title, subtitle, buttonText }) => {
  return (
    <div
      className="relative hero  h-[80vh] object-cover rounded-lg flex items-center justify-center "
      style={{
        backgroundImage: `url("${img}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg">
          <h1 className="mb-5 text-4xl md:text-6xl font-extrabold drop-shadow-lg">
            {title}
          </h1>
          <p className="mb-6 text-lg md:text-xl font-light">{subtitle}</p>

          {buttonText && (
            <Link to="/order">
              <button className="px-6 py-3 rounded-full bg-primary hover:bg-primary/90 transition-all duration-300 font-semibold shadow-lg hover:scale-105">
                {buttonText}
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cover;
