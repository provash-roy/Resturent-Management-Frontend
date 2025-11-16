import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  console.log(orders);

  // Load all data
  const loadData = async () => {
    try {
      const [orders] = await Promise.all([
        axios.get("http://localhost:5000/allOrders"),
      ]);
      console.log(orders);
      setOrders(orders.data);
    } catch (err) {
      console.error("Failed to load data:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  const totalPrice = orders.reduce((acc, item) => acc + item.price, 0);

  // Update Order Status
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/orders/${id}`, {
        status: newStatus,
      });
      alert("✅ Order status updated");
      loadData();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update order status");
    }
  };

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this item!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const res = await axios.delete(`http://localhost:5000/orders/${id}`);
          if (res.status === 200 || res.data.deletedCount > 0) {
            swal(
              "Deleted!",
              "The item has been removed from your cart.",
              "success"
            );
            loadData();
          }
        } catch (error) {
          swal("Error!", "Failed to delete item.", error);
        }
      }
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen rounded-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-lg shadow-md mb-6 border-l-4 border-orange-500">
        <h2 className="text-2xl font-semibold mb-2 md:mb-0">
          <span className="text-orange-600">Items: {orders.length}</span>
        </h2>
        <h2 className="text-2xl font-semibold mb-2 md:mb-0">
          <span className="text-orange-600">
            Total: ${totalPrice.toFixed(2)}
          </span>
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white rounded-lg shadow-md">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="p-3 text-left">#</th>

              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Action</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              <tr
                key={item._id}
                className="border-b hover:bg-orange-50 transition-all"
              >
                <td className="p-3  text-orange-600">{index + 1}</td>

                <td className="p-3 underline font-medium  text-orange-600">
                  <Link to={`/dashboard/customersOrder/${item.name}`}>
                    {item.name}
                  </Link>
                </td>
                <td className="p-3 font-medium text-orange-600">
                  <Link
                    to={`/dashboard/user/${item.email}`}
                    className="underline hover:text-orange-500"
                  >
                    {item.email}
                  </Link>
                </td>
                <td className="p-3 capitalize font-medium  text-orange-600">
                  {item.category}
                </td>
                <td className="p-3 text-orange-600 font-semibold">
                  ${item.price}
                </td>
                <td className="p-3 text-orange-600">
                  {(() => {
                    const d = new Date(item.orderedAt);
                    const day = String(d.getDate()).padStart(2, "0");
                    const month = String(d.getMonth() + 1).padStart(2, "0"); // 0-indexed
                    const year = String(d.getFullYear()).slice(-2); // last 2 digits
                    return `${day}/${month}/${year}`;
                  })()}
                </td>

                <td className="p-3">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Remove
                  </button>
                </td>
                <td className="p-3 capitalize font-semibold text-green-600">
                  <div>
                    <select
                      className="border p-1 mr-2"
                      value={item.status}
                      onChange={(e) => updateStatus(item._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty Cart Message */}
        {orders.length === 0 && (
          <p className="text-center text-gray-500 mt-6 text-lg">
            Your cart is empty 😔
          </p>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
