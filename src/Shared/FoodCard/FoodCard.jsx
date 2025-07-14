import React from "react";

const FoodCard = ({ item }) => {
  const { name, price, image, recipe } = item;
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <img src={image} alt="Shoes" className="rounded-xl" />
      </figure>
      <p className="absolute left-0 mx-12 bg-black p-1 my-10">${price}</p>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions">
          <button className="btn btn-primary">Add to Card</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
