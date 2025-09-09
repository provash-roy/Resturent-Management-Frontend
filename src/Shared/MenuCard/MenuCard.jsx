import React from "react";

const MenuCard = ({ item }) => {
  const { name, image, recipe, price } = item;
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:scale-105 transform transition duration-300 w-64">
      {/* Image Section */}
      <img className="w-full h-36 object-cover" src={image} alt={name} />

      {/* Content Section */}
      <div className="p-3 text-center">
        <h2 className="text-md font-bold text-amber-600 uppercase tracking-wide">
          {name}
        </h2>
        <p className="text-gray-600 text-sm mt-1">{recipe}</p>

        {/* Price */}
        <div className="mt-3">
          <span className="inline-block bg-amber-500 text-white font-semibold px-3 py-1 rounded-lg shadow-sm">
            ${price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
