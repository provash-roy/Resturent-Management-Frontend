import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
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
import { useEffect } from "react";

const Dashboard = () => {
  const [isAdmin, isLoading] = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  //Redirect logic (only when user visits /dashboard root)
  useEffect(() => {
    if (!isLoading) {
      if (location.pathname === "/dashboard") {
        if (isAdmin) {
          navigate("/dashboard/adminHome");
        } else {
          navigate("/dashboard/userHome");
        }
      }
    }
  }, [isAdmin, isLoading, location.pathname, navigate]);

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
                <NavLink to="/dashboard/adminHome">
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItems">
                  <FaUtensils /> Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageItems">
                  <FaList /> Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users">
                  <FaUsers /> All Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allOrders">
                  <FaBook /> All Orders
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/managePayment">
                  <FaCalendar /> All Payment
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userHome">
                  <FaHome /> User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/cart">
                  <FaCartShopping /> My Cart
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myorders">
                  <FaCartShopping /> My Orders
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <FaList /> Payment History
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>

          {/* Common Links */}
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

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
