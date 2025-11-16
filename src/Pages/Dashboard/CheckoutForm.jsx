import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useContext, useState } from "react";
import useCart from "../../Hooks/useCart";
import { AuthContext } from "../../Providers/AuthProvider";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const [orders, refetch] = useCart();
  const { user } = useContext(AuthContext);

  const totalPrice = orders.reduce((acc, item) => acc + item.price, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const card = elements.getElement(CardElement);

    const { paymentMethod, error: pmError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (pmError) {
      alert(pmError.message);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/create-payment-intent",
        {
          totalPrice,
        }
      );

      const { clientSecret } = res.data;

      const confirmResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmResult.error) {
        alert(confirmResult.error.message);
      } else if (confirmResult.paymentIntent.status === "succeeded") {
        alert("Payment Successful!");
        
        const payment = {
          name: user.displayName,
          email: user.email,
          price: totalPrice,
          transactionId: paymentMethod.id,
          date: new Date(),
          orderIds: orders.map((item) => item._id),
          menuIds: orders.map((item) => item.menuId),
          status: "Pending",
        };

        await axios.post("http://localhost:5000/payment", payment);
        refetch();
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg border-l-4 border-orange-500">
      <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
        Complete Your Payment
      </h2>

      <p className="mb-4 text-gray-700">
        Total Amount:{" "}
        <span className="font-semibold text-orange-600">
          ${totalPrice.toFixed(2)}
        </span>
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Card Details
          </label>
          <div className="p-3 border border-gray-300 rounded-md shadow-sm">
            <CardElement />
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow transition-all ${
            !stripe || loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
