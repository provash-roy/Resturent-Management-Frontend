import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useContext } from "react";
import useCart from "../../Hooks/useCart";
import { AuthContext } from "../../Providers/AuthProvider";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [orders, refetch] = useCart();
  const { user } = useContext(AuthContext);

  const totalPrice = orders.reduce((acc, item) => acc + item.price, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    const { paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    const res = await axios.post(
      "http://localhost:5000/create-payment-intent",
      {
        totalPrice,
      }
    );

    const data = res.data;

    const confirmResult = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmResult.error) {
      alert(confirmResult.error.message);
    } else if (confirmResult.paymentIntent.status === "succeeded") {
      console.log(confirmResult.paymentIntent);
      alert("Payment Successful!");

      const payment = {
        email: user.email,
        price: totalPrice,
        transactionId: paymentMethod.id,
        date: new Date(),
        orderIds: orders.map((item) => item._id),
        menuIds: orders.map((item) => item.menuId),
        status: "Pending",
      };

      const res = await axios.post("http://localhost:5000/payment", payment);
      console.log(res);
      refetch();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="my-5">
          <CardElement></CardElement>
          <button type="submit" className="btn btn-primary" disabled={!stripe}>
            Pay
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
