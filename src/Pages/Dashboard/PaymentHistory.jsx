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
    <>
      <h2>My Payment History</h2>
      <table>
        <thead>
          <tr className="mx-2">
            <th>#</th>
            <th>Price</th>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>${item.price}</td>
              <td>{item.transactionId}</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PaymentHistory;
