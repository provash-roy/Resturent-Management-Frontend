import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Fetch user profile
  useEffect(() => {
    if (!user?.email) return;
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/users/${user.email}`
        );
        setProfile(res.data); // এখানে res.data তে _id থাকবে
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, [user]);

  // ✅ Start editing
  const handleEdit = (field) => {
    setEditField(field);
    setTempValue(profile[field] || "");
  };

  // ✅ Cancel editing
  const handleCancel = () => {
    setEditField(null);
    setTempValue("");
  };

  // ✅ Save updated field
  const handleSave = async (field) => {
    try {
      const updatedProfile = { ...profile, [field]: tempValue };
      setProfile(updatedProfile);
      setEditField(null);

      // এখন আমরা profile._id ব্যবহার করছি (user._id নয়)
      await axios.put(
        `http://localhost:5000/users/${profile._id}`,
        updatedProfile
      );

      setMessage(`${field} updated successfully!`);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Update failed:", err);
      setMessage("Update failed!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-gray-900 text-gray-100 p-6 rounded-2xl shadow-lg border border-gray-700">
      <h1 className="text-3xl font-bold text-center text-orange-400 mb-6">
        Foodwala Profile
      </h1>

      {message && (
        <div className="text-center text-green-400 font-semibold mb-4">
          {message}
        </div>
      )}

      {/* ✅ Profile Info */}
      <div className="space-y-6">
        {["name", "email", "address", "phone"].map((field) => (
          <div
            key={field}
            className="flex justify-between items-center border-b border-gray-700 pb-3"
          >
            <div className="flex-1">
              <p className="text-gray-400 capitalize">{field}</p>

              {editField === field ? (
                <input
                  type="text"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="w-full bg-gray-800 text-white p-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              ) : (
                <p className="text-lg font-medium text-white mt-1">
                  {profile[field] || "Not set"}
                </p>
              )}
            </div>

            {editField === field ? (
              <div className="flex space-x-2 ml-3">
                <button
                  onClick={() => handleSave(field)}
                  className="bg-green-600 p-2 rounded hover:bg-green-700"
                >
                  <FaCheck />
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-600 p-2 rounded hover:bg-red-700"
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleEdit(field)}
                className="text-orange-400 hover:text-orange-500 ml-3"
              >
                <FaEdit />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
