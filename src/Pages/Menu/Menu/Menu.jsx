import React, { useEffect, useState } from "react";
import Footer from "../../../Shared/Footer/Footer";
import Cover from "../../../Shared/Cover/Cover";
import menuImge from "../../../assets/menu/banner3.jpg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import soupImg from "../../../assets/menu/soup-bg.jpg";
import desertImg from "../../../assets/menu/dessert-bg.jpeg";
import PopularMenu from "../../Home/PopularMenu/PopularMenu";
import MenuCard from "../../../Shared/MenuCard/MenuCard";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);
  const offered = menu.filter((item) => item.category === "offered");
  const pizza = menu.filter((item) => item.category === "pizza");
  const salad = menu.filter((item) => item.category === "salad");
  const desserts = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");

  return (
    <div className="">
      <Cover
        img={menuImge}
        title="Our Menu"
        subtitle="Would you like to try a dish?"
      />
      <div>
        <SectionTitle
          heading={"Today's Offer"}
          subHeading={"Don't Miss"}
        ></SectionTitle>
      </div>
      <div className="grid md:grid-cols-3 gap-7">
        {offered.map((item) => (
          <MenuCard key={item._id} item={item}></MenuCard>
        ))}
      </div>

      <Cover
        img={pizzaImg}
        title="Pizza"
        subtitle="Would you like to try a dish?"
        buttonText="Order Now"
      />
      <div className="grid md:grid-cols-3 gap-7">
        {pizza.map((item) => (
          <MenuCard key={item._id} item={item}></MenuCard>
        ))}
      </div>
      <Cover
        img={saladImg}
        title="Salad"
        subtitle="Would you like to try a dish?"
        buttonText="Order Now"
      />
      <div className="grid md:grid-cols-3 gap-7">
        {salad.map((item) => (
          <MenuCard key={item._id} item={item}></MenuCard>
        ))}
      </div>
      <Cover
        img={soupImg}
        title="Soup"
        subtitle="Would you like to try a dish?"
        buttonText="Order Now"
      />
      <div className="grid md:grid-cols-3 gap-7">
        {soup.map((item) => (
          <MenuCard key={item._id} item={item}></MenuCard>
        ))}
      </div>
      <Cover
        img={desertImg}
        title="Dessert"
        subtitle="Would you like to try a dish?"
        buttonText="Order Now"
      />
      <div className="grid md:grid-cols-3 gap-7">
        {desserts.map((item) => (
          <MenuCard key={item._id} item={item}></MenuCard>
        ))}
      </div>
    </div>
  );
};

export default Menu;
