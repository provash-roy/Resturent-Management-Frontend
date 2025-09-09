import React, { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import swal from "sweetalert";
import useCart from "../../Hooks/useCart";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosSecure } from "../../Hooks/useAxiosSecure";

const FoodCard = ({ item }) => {
  const { name, price, image, recipe, _id, category } = item;
  const { user } = useContext(AuthContext);
  const [, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleOnclick = async () => {
    if (user && user.email) {
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price,
        category,
      };
      try {
        const res = await axiosSecure.post("/orders", cartItem);
        if (res.status === 201 || res.data.insertedId) {
          refetch();
          swal(
            "Order Placed!",
            "Your order has been placed successfully.",
            "success"
          );
        }
      } catch (error) {
        console.error("Error placing order:", error);
        swal("Oops...", "Failed to place order. Please try again.", "error");
      }
    } else {
      swal({
        title: "Please log in to place an order!",
        text: "You must be logged in to add items to your cart.",
        icon: "warning",
        buttons: ["Cancel", "Login Now"],
        dangerMode: true,
      }).then((willLogin) => {
        if (willLogin) navigate("/login", { state: { from: location } });
      });
    }
  };

  return (
    //flex flex-col md:flex-row md:grid md:grid-cols-3 gap-4
    <div className="flex  ">
      <div className="relative card w-64 md:w-72 h-auto rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
        <figure className="relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full font-semibold shadow-md">
            ${price}
          </div>
        </figure>

        <div className="card-body text-center px-4 py-3 bg-white">
          <h2 className="card-title text-lg md:text-xl font-bold text-gray-800">
            {name}
          </h2>
          <p className="text-gray-500 mt-1 text-sm">{recipe}</p>
          <div className="card-actions mt-3">
            <button
              onClick={handleOnclick}
              className="btn w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:from-secondary hover:to-primary shadow-md transition-all duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
