import React, { useState } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

import RegisterAnimation from "../../assets/RegisterAnimation.json";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../Home/SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import usePageTitle from "../../hooks/usePageTitle";
import axios from "axios";

const Register = () => {
  usePageTitle("Register");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photo.value;

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }

    setError("");

    try {
      const res = await axios.post(
        "https://event-hub-server-one.vercel.app/auth/register",
        {
          name,
          email,
          password,
          photoURL,
        }
      );

      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "Now login to continue",
        });
        navigate("/login");
      }
    } catch (error) {
      const msg =
        error.response?.data?.error || error.message || "Registration failed.";
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
        {/* Animation */}
        <div className="hidden lg:flex w-1/2 bg-[#00B894] bg-opacity-20 items-center justify-center p-10">
          <Lottie
            animationData={RegisterAnimation}
            style={{ width: "100%", maxWidth: 450 }}
            loop={true}
          />
        </div>

        {/* Form */}
        <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <h1
            className="text-5xl font-extrabold mb-8 text-center md:text-left"
            style={{ color: "#2C3E50" }}
          >
            Register Now!
          </h1>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="md:flex gap-3">
              {/* Name */}
              <div className="md:flex-1">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "#00B894" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  className="w-full rounded-lg border px-4 py-3 focus:outline-none transition"
                  style={{
                    borderColor: "#00B894",
                    backgroundColor: "#FFF9F0",
                    color: "#2D3436",
                  }}
                  required
                />
              </div>

              {/* Email */}
              <div className="md:flex-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "#00B894" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="w-full rounded-lg border px-4 py-3 focus:outline-none transition"
                  style={{
                    borderColor: "#00B894",
                    backgroundColor: "#FFF9F0",
                    color: "#2D3436",
                  }}
                  required
                />
              </div>
            </div>

            <div className="md:flex gap-3">
              {/* Photo URL */}
              <div className="md:flex-1">
                <label
                  htmlFor="photo"
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "#00B894" }}
                >
                  Photo URL
                </label>
                <input
                  type="url"
                  name="photo"
                  id="photo"
                  placeholder="Photo URL"
                  className="w-full rounded-lg border px-4 py-3 focus:outline-none transition"
                  style={{
                    borderColor: "#00B894",
                    backgroundColor: "#FFF9F0",
                    color: "#2D3436",
                  }}
                />
              </div>

              {/* Password */}
              <div className="md:flex-1">
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
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="w-full rounded-lg border px-4 py-3 focus:outline-none transition"
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
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
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
            </div>

            {/* Forgot */}
            <div className="flex justify-between items-center">
              <Link
                to=""
                className="text-sm font-medium hover:underline"
                style={{ color: "#00B894" }}
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
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
              Register
            </button>

            <p
              className="text-center text-sm mt-4"
              style={{ color: "#636e72" }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                className="underline font-medium"
                style={{ color: "#00B894" }}
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
