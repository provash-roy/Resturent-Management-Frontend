import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import logo from "../../assets/icon/image.png";
import { HiOutlineShoppingCart } from "react-icons/hi";

import useCart from "../../Hooks/useCart";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [orders] = useCart();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
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
              <Link to="/menu">Our Menu</Link>
            </li>
            <li>
              <Link to="/order">Order Food</Link>
            </li>
          </ul>
        </div>
        <Link to="/">
          <img className="h-20 object-contain" src={logo} alt="Foodwala Logo" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link className="font-bold" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="font-bold" to="/dashboard/cart">
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="font-bold" to="/menu">
              Our Menu
            </Link>
          </li>
          <li>
            <Link className="font-bold" to="/order">
              Order Food
            </Link>
          </li>

          <li>
            <div>
              <HiOutlineShoppingCart />
              <div className="badge badge-sm">+{orders.length}</div>
            </div>
          </li>

          {user ? (
            <>
              <span>{user.displayName}</span>
              <button
                onClick={handleLogOut}
                className="btn btn-outline font-bold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <li>
                <Link className="font-bold" to="/login">
                  Login
                </Link>
              </li>

              <li>
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
