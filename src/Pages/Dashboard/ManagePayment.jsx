import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";

const ManagePayment = () => {
  const [payments, setPayments] = useState([]);

  // Load all payments
  const loadPayments = async () => {
    try {
      const token = localStorage.getItem("access-token"); // JWT token
      const res = await axios.get("http://localhost:5000/payments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(res.data);
    } catch (err) {
      console.error(err);
      swal("Error", "Failed to load payments", "error");
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
        Admin Payment Management
      </h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="table-auto w-full">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Transaction ID</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((item, index) => (
              <tr
                key={item._id}
                className="border-b hover:bg-orange-50 transition-all"
              >
                <td className="p-3 text-orange-600">{index + 1}</td>
                <td className="p-3 text-orange-600">{item.name}</td>
                <td className="p-3 text-orange-600 font-semibold">
                  ${Number(item.price).toFixed(2)}
                </td>
                <td className="p-3 text-orange-600 font-mono">
                  {item.transactionId}
                </td>
                <td className="p-3 text-orange-600">
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td className="p-3 text-orange-600 font-semibold">
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePayment;
