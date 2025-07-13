import React from "react";

const MenuCard = ({ item }) => {
  const { name, image, recipe, price } = item;
  return (
    <div>
      <div>
        <img className="rounded-2xl" src={image} alt="" />
        <p>{name}</p>
        <h3>{recipe}</h3>
        <h3>${price}</h3>
      </div>
    </div>
  );
};

export default MenuCard;
