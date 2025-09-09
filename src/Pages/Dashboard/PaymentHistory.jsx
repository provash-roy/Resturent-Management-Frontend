import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/payments/${user.email}`)
      .then((res) => setPayments(res.data))
      .catch((err) => console.error(err));
  }, [user.email]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
        My Payment History
      </h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="table-auto w-full">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Transaction ID</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-orange-50 transition-all"
                >
                  <td className="p-3  text-orange-600">{index + 1}</td>
                  <td className="p-3 text-orange-600 font-semibold">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="p-3  text-orange-600 font-mono">
                    {item.transactionId}
                  </td>
                  <td className="p-3  text-orange-600">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td
                    className={`p-3 font-semibold ${
                      item.status === "success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No payments found 😔
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
