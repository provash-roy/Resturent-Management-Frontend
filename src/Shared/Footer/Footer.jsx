import React from "react";
import { FaTwitter, FaYoutube, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content p-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <aside className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-xl font-bold mb-4 text-orange-400">CONTACT US</h2>
          <p className="text-sm text-gray-200 leading-relaxed">
            123 ABS Street, Parkmore, Rangpur
            <br />
            Phone: 01309440811
            <br />
            Mon - Fri: 08:00 am - 22:00 pm
            <br /> Sat - Sun: 10:00 am - 23:00 pm
          </p>
        </aside>

        {/* Social Media */}
        <nav className="flex flex-col items-center text-center">
          <h2 className="text-xl font-bold mb-2 text-orange-400">FOLLOW US</h2>
          <p className="text-sm text-gray-200 mb-4">Join Us On Social Media</p>

          <div className="flex gap-4 text-2xl text-gray-200">
            <a
              href="#"
              className="hover:text-orange-400 transition-colors duration-300"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="hover:text-orange-400 transition-colors duration-300"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
            <a
              href="#"
              className="hover:text-orange-400 transition-colors duration-300"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
          </div>
        </nav>

        {/* About Section */}
        <div className="flex flex-col items-center  text-center md:text-center">
          <h2 className="text-xl font-bold mb-4  text-orange-400">ABOUT</h2>
          <p className="text-sm text-gray-200 leading-relaxed">
            Foodwala is your favorite place to order delicious meals online.
            Explore our menu and enjoy tasty food delivered to your door.
          </p>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Foodwala. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
