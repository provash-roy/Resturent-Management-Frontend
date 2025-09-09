import React from "react";
import featuredimage from "../../../assets/home/featured.jpg";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import "./Featured.css";

const Featured = () => {
  return (
    <div className="my-20">
      {/* Section Title */}
      <SectionTitle
        subHeading={"--- Check It Now ---"}
        heading={"From Our Menu"}
      />

      {/* Featured Container with Parallax */}
      <div className="featured-item relative w-full h-[80vh] rounded-2xl shadow-2xl overflow-hidden">
        {/* Overlay for cinematic effect */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row justify-center items-center gap-10 px-10 md:px-20 py-16 h-full">
          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <img
              className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
              src={featuredimage}
              alt="Featured Dish"
            />
          </div>

          {/* Text Section */}
          <div className="w-full md:w-1/2 text-white">
            <p className="text-gray-300 text-sm mb-3">March 20, 2023</p>
            <h3 className="text-3xl font-bold mb-4 tracking-wide">
              WHERE CAN I GET SOME?
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              voluptate facere, deserunt dolores maiores quod nobis quas quasi.
              Eaque repellat recusandae ad laudantium tempore consequatur
              consequuntur omnis ullam maxime tenetur.
            </p>
            <button className="btn bg-yellow-500 border-0 hover:bg-yellow-600 text-black font-semibold rounded-full px-8 py-3 shadow-md transition-all duration-300">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
