import { useEffect, useState } from "react";
import OrderCoverImg from "../../assets/shop/banner2.jpg";
import Cover from "../../Shared/Cover/Cover";
import FoodCard from "../../Shared/FoodCard/FoodCard";

const Order = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0); // 0 = Tab 1, ..., 4 = Tab 5

  const handleTabClick = (index) => {
    setActiveTabIndex(index);
  };

  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);


  const pizza = menu.filter((item) => item.category === "pizza");
  const salad = menu.filter((item) => item.category === "salad");
  const desserts = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const drinks = menu.filter((item) => item.category === "drinks");

  return (
    <div>
      <Cover img={OrderCoverImg}></Cover>

      <div
        role="tablist"
        className="tabs tabs-border flex flex-wrap justify-center"
      >
        <a
          role="tab"
          className={`tab ${activeTabIndex === 0 ? "tab-active" : ""}`}
          onClick={() => handleTabClick(0)}
        >
          Salad
        </a>
        <a
          role="tab"
          className={`tab ${activeTabIndex === 1 ? "tab-active" : ""}`}
          onClick={() => handleTabClick(1)}
        >
          Pizza
        </a>
        <a
          role="tab"
          className={`tab ${activeTabIndex === 2 ? "tab-active" : ""}`}
          onClick={() => handleTabClick(2)}
        >
          Soups
        </a>
        <a
          role="tab"
          className={`tab ${activeTabIndex === 3 ? "tab-active" : ""}`}
          onClick={() => handleTabClick(3)}
        >
          Desserts
        </a>
        <a
          role="tab"
          className={`tab ${activeTabIndex === 4 ? "tab-active" : ""}`}
          onClick={() => handleTabClick(4)}
        >
          Drinks
        </a>
      </div>

      <div className="mt-4 text-center">
        {activeTabIndex === 0 && (
          <div className="grid md:grid-cols-3 gap-7">
            {salad.map((item) => (
              <FoodCard key={item._id} item={item}></FoodCard>
            ))}
          </div>
        )}
        {activeTabIndex === 1 && (
          <div className="grid md:grid-cols-3 gap-7">
            {pizza.map((item) => (
              <FoodCard key={item._id} item={item}></FoodCard>
            ))}
          </div>
        )}
        {activeTabIndex === 2 && (
          <div className="grid md:grid-cols-3 gap-7">
            {soup.map((item) => (
              <FoodCard key={item._id} item={item}></FoodCard>
            ))}
          </div>
        )}
        {activeTabIndex === 3 && (
          <div className="grid md:grid-cols-3 gap-7">
            {desserts.map((item) => (
              <FoodCard key={item._id} item={item}></FoodCard>
            ))}
          </div>
        )}
        {activeTabIndex === 4 && (
          <div className="grid md:grid-cols-3 gap-7">
            {drinks.map((item) => (
              <FoodCard key={item._id} item={item}></FoodCard>
            ))}
          </div>
        )}
        {/* {activeTabIndex === 4 && <p>Content of Tab 5</p>} */}
      </div>
    </div>
  );
};

export default Order;
