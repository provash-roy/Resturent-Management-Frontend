import useCart from "../../Hooks/useCart";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const Cart = () => {
  const [orders, refetch] = useCart();
  const totalPrice = orders.reduce((acc, item) => acc + item.price, 0);

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
            refetch();
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
        <Link to="/dashboard/payment">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg shadow transition-all">
            Pay Now
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white rounded-lg shadow-md">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
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
                <td className="p-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={item.image} alt={item.name} />
                    </div>
                  </div>
                </td>
                <td className="p-3 font-medium  text-orange-600">
                  {item.name}
                </td>
                <td className="p-3 capitalize  text-orange-600">
                  {item.category}
                </td>
                <td className="p-3 text-orange-600 font-semibold">
                  ${item.price}
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
                  {item.status}
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

export default Cart;
