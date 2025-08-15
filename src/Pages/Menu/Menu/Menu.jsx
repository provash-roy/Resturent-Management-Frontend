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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch("http://localhost:5000/menu");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setMenu(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const offered = menu.filter((item) => item.category === "offered");
  const pizza = menu.filter((item) => item.category === "pizza");
  const salad = menu.filter((item) => item.category === "salad");
  const desserts = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");

  if (loading) return <div className="text-center mt-10">Loading menu...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div>
      <Cover
        img={menuImge}
        title="Our Menu"
        subtitle="Would you like to try a dish?"
      />

      {/* Today's Offer */}
      <SectionTitle heading="Today's Offer" subHeading="Don't Miss" />
      <div className="grid md:grid-cols-3 gap-7">
        {offered.length > 0 ? (
          offered.map((item) => <MenuCard key={item._id} item={item} />)
        ) : (
          <p className="text-center col-span-3">No offers available</p>
        )}
      </div>

      {/* Pizza Section */}
      <Cover
        img={pizzaImg}
        title="Pizza"
        subtitle="Would you like to try a dish?"
        buttonText="Order Now"
      />
      <div className="grid md:grid-cols-3 gap-7">
        {pizza.length > 0 ? (
          pizza.map((item) => <MenuCard key={item._id} item={item} />)
        ) : (
          <p className="text-center col-span-3">No pizza available</p>
        )}
      </div>

      {/* Salad Section */}
      <Cover
        img={saladImg}
        title="Salad"
        subtitle="Would you like to try a dish?"
        buttonText="Order Now"
      />
      <div className="grid md:grid-cols-3 gap-7">
        {salad.length > 0 ? (
          salad.map((item) => <MenuCard key={item._id} item={item} />)
        ) : (
          <p className="text-center col-span-3">No salad available</p>
        )}
      </div>

      {/* Soup Section */}
      <Cover
        img={soupImg}
        title="Soup"
        subtitle="Would you like to try a dish?"
        buttonText="Order Now"
      />
      <div className="grid md:grid-cols-3 gap-7">
        {soup.length > 0 ? (
          soup.map((item) => <MenuCard key={item._id} item={item} />)
        ) : (
          <p className="text-center col-span-3">No soup available</p>
        )}
      </div>

      {/* Dessert Section */}
      <Cover
        img={desertImg}
        title="Dessert"
        subtitle="Would you like to try a dish?"
        buttonText="Order Now"
      />
      <div className="grid md:grid-cols-3 gap-7">
        {desserts.length > 0 ? (
          desserts.map((item) => <MenuCard key={item._id} item={item} />)
        ) : (
          <p className="text-center col-span-3">No dessert available</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Menu;
