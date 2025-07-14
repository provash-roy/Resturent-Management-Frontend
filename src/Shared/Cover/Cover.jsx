import React from "react";
import { Link } from "react-router-dom";

const Cover = ({ img, title, subtitle, buttonText }) => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url("${img}")`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">{title}</h1>
          <p className="mb-5">{subtitle}</p>
          {buttonText && (
            <Link to="/order">
              <button className="btn btn-primary">{buttonText}</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cover;
