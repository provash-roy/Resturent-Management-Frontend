import React, { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useCart from "../../Hooks/useCart";

const UserHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [orders] = useCart();

  // Featured menu items query
  const { data: menuItems = [] } = useQuery({
    queryKey: ["menu-items"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products/featured");
      return res.data;
    },
  });

  // User orders query to count total orders
  const { data: userOrders = [] } = useQuery({
    queryKey: ["user-orders", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/orders/${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="p-6">
      {/* Welcome Banner + Edit Profile Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-orange-600 text-center md:text-left mb-4 md:mb-0">
          Hi, {user?.displayName || "Foodie"}! Welcome to FoodWala
        </h2>
        <Link
          to="/profile"
          className="btn bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md"
        >
          Edit Profile
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat bg-orange-50 rounded-lg shadow-md p-6 border-l-4 border-orange-500 text-center">
          <div className="stat-title font-bold text-orange-700 mb-2">
            Items in Cart
          </div>
          <div className="stat-value text-orange-600 text-xl">
            {orders.length}
          </div>
        </div>

        <div className="stat bg-orange-50 rounded-lg shadow-md p-6 border-l-4 border-orange-500 text-center">
          <div className="stat-title font-bold text-orange-700 mb-2">
            Menu Items Available
          </div>
          <div className="stat-value text-orange-600 text-xl">
            {menuItems.length}
          </div>
        </div>

        <div className="stat bg-orange-50 rounded-lg shadow-md p-6 border-l-4 border-orange-500 text-center">
          <div className="stat-title font-bold text-orange-700 mb-2">
            Total Orders Placed
          </div>
          <div className="stat-value text-orange-600 text-xl">
            {userOrders.length}
          </div>
        </div>
      </div>

      {/* Featured Menu Items */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-orange-600 text-center">
          Featured Menu
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div
              key={item._id}
              className="card bg-white rounded-lg shadow-md p-4"
            >
              <img
                className="h-40 w-full object-cover rounded"
                src={item.image}
                alt={item.name}
              />
              <div className="mt-2 font-bold text-lg text-black">
                {item.name}
              </div>
              <div className="text-gray-600">{item.category}</div>
              <div className="text-orange-600 font-semibold">${item.price}</div>
              <Link
                to={`/menu`}
                className="btn btn-sm bg-amber-600 hover:bg-amber-700 mt-2 w-full text-white"
              >
                Order Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserHome;
