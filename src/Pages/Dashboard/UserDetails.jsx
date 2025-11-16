import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserDetails = () => {
  const { email } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${email}`);
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [email]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <p className="text-center mt-10">User not found</p>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-900 text-gray-100 p-6 rounded-2xl shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-orange-400 mb-4">User Details</h2>
      <p>
        <span className="font-semibold">Name:</span> {user.name}
      </p>
      <p>
        <span className="font-semibold">Email:</span> {user.email}
      </p>
      <p>
        <span className="font-semibold">Phone:</span> {user.phone || "Not set"}
      </p>
      <p>
        <span className="font-semibold">Address:</span>{" "}
        {user.address || "Not set"}
      </p>
    </div>
  );
};

export default UserDetails;
