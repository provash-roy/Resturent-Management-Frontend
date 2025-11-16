import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";

const CustomersWhoOrdered = () => {
  const axiosSecure = useAxiosSecure();
  const { productName } = useParams(); // ← URL থেকে productName নেবে
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async (name) => {
    try {
      const res = await axiosSecure.get(
        `/orders/customers-who-ordered/${name}`
      );
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
      setCustomers([]);
    }
  };

  useEffect(() => {
    if (productName) {
      fetchCustomers(productName);
    }
  }, [productName]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-orange-600 text-center mb-6">
        Customers Who Ordered:{" "}
        <span className="capitalize text-orange-500">{productName}</span>
      </h2>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="table-auto w-full border border-orange-300">
          <thead>
            <tr className="bg-orange-100 text-orange-600 font-bold">
              <th className="px-4 py-2 border">Customer Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Product</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Order Status</th>
              <th className="px-4 py-2 border">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((c, idx) => (
                <tr
                  key={idx}
                  className="text-center hover:bg-orange-50 text-orange-600"
                >
                  <td className="border px-4 py-2 font-medium">
                    {c.customer?.name}
                  </td>
                  <td className="border px-4 py-2">{c.customer?.email}</td>
                  <td className="border px-4 py-2">{c.orderedProduct}</td>
                  <td className="border px-4 py-2 capitalize">{c.category}</td>
                  <td className="border px-4 py-2 font-semibold">${c.price}</td>
                  <td className="border px-4 py-2 capitalize">
                    {c.orderStatus}
                  </td>
                  <td className="border px-4 py-2 capitalize">
                    {c.paymentStatus}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-4 text-orange-400 font-medium"
                >
                  No customers found for this product 😔
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersWhoOrdered;
