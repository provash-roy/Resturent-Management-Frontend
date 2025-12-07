import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import logo from "../../assets/icon/image.png";
import useCart from "../../Hooks/useCart";
import useAdmin from "../../Hooks/useAdmin";

import { HiOutlineShoppingCart } from "react-icons/hi";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [orders] = useCart();
  const [isAdmin, loading] = useAdmin(user?.email);

  if (loading) return null;

  const handleLogOut = () => {
    logOut().catch((err) => console.log(err));
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link className="font-bold" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="font-bold" to="menu">
                Menu
              </Link>
            </li>
            {!isAdmin && (
              <li>
                <Link className="font-bold" to="order">
                  Order Food
                </Link>
              </li>
            )}
          </ul>
        </div>
        <Link to="/">
          <img className="h-20 object-contain" src={logo} alt="Foodwala Logo" />
        </Link>
      </div>

      {/* Navbar Center (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 items-center">
          <li className="mx-2">
            <Link className="font-bold" to="/">
              Home
            </Link>
          </li>
          <li className="mx-2">
            <Link className="font-bold" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="mx-2">
            <Link className="font-bold" to="menu">
              Menu
            </Link>
          </li>
          {!isAdmin && (
            <li>
              <Link to="order" className="font-bold">
                Order Food
              </Link>
            </li>
          )}
          {!isAdmin && (
            <li>
              <Link to="/dashboard">
                <button className="btn">
                  <HiOutlineShoppingCart />

                  <div className="badge badge-sm">+{orders.length}</div>
                </button>
              </Link>
            </li>
          )}

          {user ? (
            <>
              <li className="mx-2 font-bold">
                <span>{user.displayName}</span>
              </li>
              <li className="mx-2">
                <button
                  onClick={handleLogOut}
                  className="btn btn-outline font-bold"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="mx-2">
                <Link className="font-bold" to="/login">
                  Login
                </Link>
              </li>
              <li className="mx-2">
                <Link className="font-bold" to="/register">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
