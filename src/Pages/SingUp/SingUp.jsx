import React, { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, Link } from "react-router-dom"; // ✅ Link added

const SignUp = () => {
  const { register, googleSignIn, loading } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    register(name, email, password)
      .then((result) => {
        const user = result.user;
        console.log("Registered:", user);

        axios
          .post("http://localhost:5000/users", { name, email })
          .then(() => {
            console.log("User saved to DB");
            navigate("/");
          })
          .catch((err) => {
            console.error("Error saving user to DB:", err);
          });

        form.reset();
      })
      .catch((err) => {
        console.error(err.message);
        setError("Registration failed. Try again.");
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log("Google login success:", user);

        axios
          .post("http://localhost:5000/users", {
            name: user.displayName,
            email: user.email,
          })
          .then(() => {
            console.log("Google user saved to DB");
            navigate("/");
          })
          .catch((err) => {
            console.error("Google user save failed:", err);
          });
      })
      .catch((err) => {
        console.error("Google Sign-In error:", err);
        setError("Google Sign-In failed. Try again.");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-100 via-yellow-100 to-orange-200 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left: Info Text */}
        <div className="bg-orange-500 text-white p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">Create Account</h2>
          <p className="text-lg">
            Join our community and explore new possibilities. Start your journey
            today!
          </p>
        </div>

        {/* Right: Sign Up Form */}
        <form onSubmit={handleSignUp} className="p-10">
          <h3 className="text-2xl text-center font-semibold text-orange-600 mb-6">
            Sign Up
          </h3>

          <div className="mb-4">
            <label className="block text-orange-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-orange-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-orange-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="******"
              required
              className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            />
          </div>

          {error && <p className="text-red-600 mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>

          {/* Divider */}
          <div className="divider text-orange-500 my-6">OR</div>

          {/* Google Sign-In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 border border-orange-400 py-2 rounded-lg text-orange-600 font-semibold hover:bg-orange-100 transition duration-300"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>

          {/* ✅ Login link below Google button */}
          <p className="text-center text-sm text-gray-700 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
