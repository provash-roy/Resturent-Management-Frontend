import React, { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import swal from "sweetalert";
import axios from "axios";
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
        if (willLogin) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <img src={image} alt="Foods" className="rounded-xl" />
      </figure>
      <p className="absolute left-0 mx-12 bg-black p-1 my-10 text-white">
        ${price}
      </p>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions">
          <button onClick={handleOnclick} className="btn btn-primary">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
