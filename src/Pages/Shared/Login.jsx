import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import Lottie from "lottie-react";
import RegisterAnimation from "../../assets/RegisterAnimation.json";

import { motion } from "framer-motion";
import Swal from "sweetalert2";
import axios from "axios";

import usePageTitle from "../../hooks/usePageTitle";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  usePageTitle("Login");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";
  const { setUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    setError("");

    try {
      const res = await axios.post(
        "https://event-hub-server-one.vercel.app/auth/login",
        {
          email,
          password,
        }
      );

      if (res.data) {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome back, ${res.data.user.name}`,
        });
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data);
        navigate(from);
        window.location.reload();
      }
    } catch (err) {
      const msg = err.response?.data?.error || err.message || "Login failed.";
      setError(msg);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: msg,
      });
    }
  };

  return (
    <div className=" py-5 bg-[#FFF9F0] flex items-center justify-center px-4">
      <div className="max-w-7xl w-full bg-[#F4F6F8] rounded-3xl shadow-2xl flex overflow-hidden select-none max-h-[90vh]">
        {/* Animation side */}
        <div className="hidden lg:flex w-1/2 bg-[#00B894] bg-opacity-20 items-center justify-center p-10">
          <Lottie
            animationData={RegisterAnimation}
            style={{ width: "100%", maxWidth: 450 }}
            loop={true}
          />
        </div>

        {/* Form side */}
        <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <h1
            className="text-5xl font-extrabold mb-8 text-center md:text-left"
            style={{ color: "#2C3E50" }}
          >
            Welcome Back
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2"
                style={{ color: "#00B894" }}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border px-4 py-3 focus:outline-none transition"
                style={{
                  borderColor: "#00B894",
                  backgroundColor: "#FFF9F0",
                  color: "#2D3436",
                }}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-2"
                style={{ color: "#00B894" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Your password"
                  className="w-full rounded-lg px-4 py-3 pr-12 focus:outline-none transition"
                  style={{
                    borderColor: "#00B894",
                    backgroundColor: "#FFF9F0",
                    color: "#2D3436",
                  }}
                  required
                />
                {error && (
                  <p
                    className="text-sm mt-1 absolute -bottom-5 left-0"
                    style={{ color: "#E74C3C" }}
                  >
                    {error}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3 right-3 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{ color: "#00B894" }}
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Link
                to=""
                className="text-sm font-medium hover:underline"
                style={{ color: "#00B894" }}
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer font-semibold py-3 rounded-lg transition"
              style={{
                backgroundColor: "#2C3E50",
                color: "#FFF9F0",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#00B894";
                e.currentTarget.style.color = "#2C3E50";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#2C3E50";
                e.currentTarget.style.color = "#FFF9F0";
              }}
            >
              Sign In
            </button>

            <p
              className="text-center text-gray-600 text-sm mt-4"
              style={{ color: "#636e72" }}
            >
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="underline   font-medium"
                style={{ color: "#00B894" }}
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
