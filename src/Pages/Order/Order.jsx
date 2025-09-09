import { useEffect, useState } from "react";
import OrderCoverImg from "../../assets/shop/banner2.jpg";
import Cover from "../../Shared/Cover/Cover";
import FoodCard from "../../Shared/FoodCard/FoodCard";

const categories = ["salad", "pizza", "soup", "dessert", "drinks"];

const Order = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  const filteredMenu = categories.map((cat) =>
    menu.filter((item) => item.category === cat)
  );

  return (
    <div>
      {/* Cover Section */}
      <Cover
        title={"Our Shop"}
        subtitle={"Would you Like to Try a Dish"}
        img={OrderCoverImg}
      />

      {/* Tabs */}
      <div
        role="tablist"
        className="tabs tabs-border flex flex-wrap justify-center mt-4"
      >
        {categories.map((cat, index) => (
          <button
            key={index}
            role="tab"
            className={`tab ${activeTabIndex === index ? "tab-active" : ""}`}
            onClick={() => setActiveTabIndex(index)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredMenu[activeTabIndex].map((item) => (
            <FoodCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
