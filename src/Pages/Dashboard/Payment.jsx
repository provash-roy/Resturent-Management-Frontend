import React from "react";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

const Payment = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIP_PK);
  return (
    <div>
      <SectionTitle
        subHeading={"Payment to eat Food"}
        heading={"Payment"}
      ></SectionTitle>
      <Elements stripe={stripePromise}>
        <CheckoutForm></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
