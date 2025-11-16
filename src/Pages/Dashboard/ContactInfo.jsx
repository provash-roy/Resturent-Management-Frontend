import React from "react";

const ContactInfo = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-gray-900 text-gray-100 p-8 rounded-2xl shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-orange-400 text-center">
          CONTACT US
        </h2>

        <div className="text-gray-300 space-y-2 text-center">
          <p className="text-lg font-semibold">📍 Address:</p>
          <p className="text-sm">123 ABS Street, Parkmore, Rangpur</p>

          <p className="text-lg font-semibold mt-4">📞 Phone:</p>
          <p className="text-sm">01309440811</p>

          <p className="text-lg font-semibold mt-4">🕒 Opening Hours:</p>
          <p className="text-sm">
            Mon - Fri: 08:00 am - 22:00 pm
            <br />
            Sat - Sun: 10:00 am - 23:00 pm
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
