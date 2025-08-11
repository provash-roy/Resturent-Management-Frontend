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
    <div>
      <div className="flex justify-around text-4xl my-4">
        <h2>Items : {orders.length}</h2>
        <h2>Price : ${totalPrice}</h2>

        <Link to="/dashboard/payment">
          <button className="btn btn-primary">Pay</button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={item.image} alt={item.name} />
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>${item.price}</td>
                <td>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost btn-xs text-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
