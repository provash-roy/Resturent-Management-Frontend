import React, { useEffect, useState } from "react";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import MenuCard from "../../../Shared/MenuCard/MenuCard";

const PopularMenu = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/menu")
      .then((res) => res.json())
      .then((data) => {
        const popularItems = data.filter((item) => item.category === "popular");
        setMenu(popularItems);
      });
  }, []);
  return (
    <div>
      <section>
        <SectionTitle
          heading={"Check It Now"}
          subHeading={"Our Popular Menu"}
        ></SectionTitle>

        <div className="grid md:grid-cols-4 gap-7">
          {menu.map((item) => (
            <MenuCard key={item._id} item={item}></MenuCard>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PopularMenu;
