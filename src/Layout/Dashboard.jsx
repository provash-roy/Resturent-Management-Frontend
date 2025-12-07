import { NavLink, Outlet } from "react-router-dom";
import {
  FaBook,
  FaCalendar,
  FaCartShopping,
  FaEnvelope,
  FaList,
  FaUsers,
  FaUtensils,
} from "react-icons/fa6";
import { FaHome, FaSearch } from "react-icons/fa";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin, isLoading] = useAdmin();

  if (isLoading) {
    return <p className="p-8">Loading dashboard...</p>;
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 min-h-screen bg-amber-700 text-white">
        <ul className="menu p-4 space-y-2">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="adminHome">
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="addItems">
                  <FaUtensils /> Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to="manageItems">
                  <FaList /> Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to="users">
                  <FaUsers /> All Users
                </NavLink>
              </li>
              <li>
                <NavLink to="allOrders">
                  <FaBook /> All Orders
                </NavLink>
              </li>
              <li>
                <NavLink to="managePayment">
                  <FaCalendar /> Payments
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="userHome">
                  <FaHome /> User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="cart">
                  <FaCartShopping /> My Cart
                </NavLink>
              </li>
              <li>
                <NavLink to="my-orders">
                  <FaList /> My Orders
                </NavLink>
              </li>
              <li>
                <NavLink to="paymentHistory">
                  <FaCalendar /> Payments
                </NavLink>
              </li>
            </>
          )}

          <div className="divider" />

          <li>
            <NavLink to="/">
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu">
              <FaSearch /> Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact">
              <FaEnvelope /> Contact
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
