import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const UserOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's orders from backend
  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/myOrders/${user.email}`
        );

        // Ensure each order has a date
        const ordersWithDate = res.data.map((order) => ({
          ...order,
          date: order.date || order.orderedAt || new Date().toISOString(),
        }));

        setOrders(ordersWithDate);
      } catch (err) {
        console.error("Failed to load orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  console.log(orders);
  console.log(user);

  // Total price of all orders
  const totalPrice = orders.reduce((acc, item) => acc + item.price, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-orange-600 text-lg">
        Loading your orders...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen rounded-lg">
      {/* Header / Stats */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-lg shadow-md mb-6 border-l-4 border-orange-500">
        <h2 className="text-2xl font-semibold mb-2 md:mb-0">
          <span className="text-orange-600">Items: {orders.length}</span>
        </h2>
        <h2 className="text-2xl font-semibold mb-2 md:mb-0">
          <span className="text-orange-600">User Orders</span>
        </h2>
        <h2 className="text-2xl font-semibold mb-2 md:mb-0">
          <span className="text-orange-600">
            Total: ${totalPrice.toFixed(2)}
          </span>
        </h2>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white rounded-lg shadow-md">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              <tr
                key={item._id}
                className="border-b hover:bg-orange-50 transition-all"
              >
                <td className="p-3 text-orange-600">{index + 1}</td>
                <td className="p-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={item.image} alt={item.name} />
                    </div>
                  </div>
                </td>
                <td className="p-3 font-medium text-orange-600">{item.name}</td>
                <td className="p-3 capitalize text-orange-600">
                  {item.category}
                </td>
                <td className="p-3 text-orange-600 font-semibold">
                  ${item.price}
                </td>
                <td className="p-3 text-orange-600">
                  {(() => {
                    const d = new Date(item.date);
                    const day = String(d.getDate()).padStart(2, "0");
                    const month = String(d.getMonth() + 1).padStart(2, "0"); // 0-indexed
                    const year = String(d.getFullYear()).slice(-2); // last 2 digits
                    return `${day}/${month}/${year}`;
                  })()}
                </td>

                <td className="p-3 capitalize font-semibold text-green-600">
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty Orders Message */}
        {orders.length === 0 && !loading && (
          <p className="text-center text-gray-500 mt-6 text-lg">
            You have no orders yet 😔
          </p>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
