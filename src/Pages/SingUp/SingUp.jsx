import React, { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, Link } from "react-router-dom";

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
        axios
          .post("http://localhost:5000/users", { name, email })
          .then(() => navigate("/"));

        form.reset();
      })
      .catch(() => setError("Registration failed. Try again."));
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;

        axios
          .post("http://localhost:5000/users", {
            name: user.displayName,
            email: user.email,
          })
          .then(() => navigate("/"));
      })
      .catch(() => setError("Google Sign-In failed. Try again."));
  };

  return (
    <div
      data-theme="autumn"
      className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-white text-black flex items-center justify-center"
    >
      <form
        onSubmit={handleSignUp}
        className="card bg-white/90 backdrop-blur-xl shadow-2xl ring-1 ring-orange-100 w-full max-w-md mx-auto mt-10 rounded-2xl"
      >
        <div className="card-body text-black">
          {/* Top Badge */}
          <div className="mx-auto -mt-12 mb-2 h-15 w-30 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl font-bold">Register</span>
          </div>

          <p className="text-center text-sm text-gray-700 mb-2">
            Create your new account
          </p>

          {/* Name */}
          <label className="label">
            <span className="label-text font-medium text-black">Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="p-3 rounded-2xl w-full focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
          />

          {/* Email */}
          <label className="label mt-2">
            <span className="label-text font-medium text-black">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            className="p-3 rounded-2xl w-full focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
          />

          {/* Password */}
          <label className="label mt-2">
            <span className="label-text font-medium text-black">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="******"
            required
            className="p-3 rounded-2xl w-full focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
          />

          {/* Error */}
          {error && (
            <div className="alert alert-error text-black mt-3">
              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-block mt-4 bg-orange-600 hover:bg-orange-700 border-none text-white"
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>

          {/* Divider */}
          <div className="divider text-gray-500">OR</div>

          {/* Google Sign-In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 border border-orange-400 py-2 rounded-lg text-orange-600 font-semibold hover:bg-orange-100 transition duration-300"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-700 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
