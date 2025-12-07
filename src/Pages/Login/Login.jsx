import React, { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import swal from "sweetalert";

const Login = () => {
  const { login, loading } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const email = form.email.value.trim();
    const password = form.password.value;

    try {
      const result = await login(email, password);
      console.log("Logged in:", result?.user);
      swal("Login Successful!", "Welcome back!", "success");
      navigate(from, { replace: true });
      form.reset();
    } catch (err) {
      console.error(err);
      setError("Login failed! Please check your email or password.");
    }
  };

  return (
    <div
      data-theme="autumn"
      className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-white text-black flex items-center justify-center"
    >
      <form
        onSubmit={handleLogin}
        className="card bg-white/90 backdrop-blur-xl shadow-2xl ring-1 ring-orange-100 w-full max-w-md mx-auto my-auto rounded-2xl"
      >
        <div className="card-body  text-black">
          <div className="mx-auto -mt-12 mb-2 h-20 w-20 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl font-bold">Login</span>
          </div>

          <p className="text-center text-sm text-gray-700">
            Enter your credentials to continue
          </p>

          {/* Email */}
          <label htmlFor="email" className="label">
            <span className="label-text font-medium text-black">Email</span>
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              required
              className="p-3 rounded-2xl w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>
          </div>

          {/* Password */}
          <label htmlFor="password" className="label">
            <span className="label-text font-medium text-black">Password</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="••••••••"
              required
              className="p-3 rounded-2xl w-full pr-20 focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute inset-y-0 right-0 px-3 text-sm font-medium text-orange-700 hover:text-orange-800"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="alert alert-error mt-3 text-black">
              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-block mt-4 bg-orange-600 hover:bg-orange-700 border-none text-white"
          >
            {loading && (
              <span className="loading loading-spinner loading-sm mr-2" />
            )}
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Divider */}
          <div className="divider text-gray-500">OR</div>

          {/* Google Login */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-orange-400 py-2 rounded-lg text-orange-600 font-semibold hover:bg-orange-100 transition duration-300"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>

          {/* ✅ Register link below Google button */}
          <p className="text-center text-sm text-gray-700 mt-4">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-orange-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
