// import React, { useState } from "react";
// import Lottie from "lottie-react";
// import { motion } from "motion/react";

// import RegisterAnimation from "../../assets/RegisterAnimation.json";
// import { Link, useLocation, useNavigate } from "react-router";
// import SocialLogin from "../Home/SocialLogin";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import Swal from "sweetalert2";
// import usePageTitle from "../../hooks/usePageTitle";
// import axios from "axios";

// const Register = () => {
//   usePageTitle("Register");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const location = useLocation();
//   const navigate = useNavigate();
//   const from = location.state || "/";

//   const handleRegister = async (event) => {
//     event.preventDefault();
//     const form = event.target;
//     const name = form.name.value;
//     const email = form.email.value;
//     const password = form.password.value;
//     const photoURL = form.photo.value;

//     //  Password validations
//     if (password.length < 6) {
//       setError("Password must be at least 6 characters long.");
//       return;
//     }
//     if (!/[A-Z]/.test(password)) {
//       setError("Password must contain at least one uppercase letter.");
//       return;
//     }
//     if (!/[a-z]/.test(password)) {
//       setError("Password must contain at least one lowercase letter.");
//       return;
//     }

//     setError(""); // Clear errors if validation passes

//     try {
//       const res = await axios.post("http://localhost:5000/auth/register", {
//         name,
//         email,
//         password,
//         photoURL,
//       });

//       if (res.status === 201) {
//         Swal.fire({
//           icon: "success",
//           title: "Registration Successful!",
//           text: "Now login to continue",
//         });
//         navigate("/login"); // Redirect to login
//       }
//     } catch (error) {
//       const msg =
//         error.response?.data?.error || error.message || "Registration failed.";
//       setError(msg);

//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: msg,
//       });
//     }
//   };

//   return (
//     <div className="hero bg-base-200 min-h-screen overflow-x-hidden flex items-center justify-center">
//       <div className="hero-content flex-col lg:flex-row-reverse gap-12 px-4 md:px-12">
//         <div className="text-center w-full">
//           <Lottie
//             animationData={RegisterAnimation}
//             style={{ width: "400px", maxWidth: "100%" }}
//             loop={true}
//           />
//         </div>
//         <div className="card bg-white w-full max-w-sm shrink-0 shadow-xl rounded-lg">
//           <div className="card-body px-8 py-10">
//             <form onSubmit={handleRegister} className="space-y-5">
//               <h1 className="text-4xl font-extrabold text-blue-700 mb-4">
//                 Register now!
//               </h1>

//               <label className="label font-semibold text-blue-600">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Your Name"
//                 className="input input-bordered border-blue-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-md"
//                 required
//               />

//               <label className="label font-semibold text-blue-600">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 className="input input-bordered border-blue-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-md"
//                 required
//               />

//               <label className="label font-semibold text-blue-600">
//                 Photo URL
//               </label>
//               <input
//                 type="url"
//                 name="photo"
//                 placeholder="Photo URL"
//                 className="input input-bordered border-blue-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-md"
//               />

//               <label className="label font-semibold text-blue-600">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   className="input input-bordered border-blue-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-md pr-12"
//                   required
//                 />
//                 {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute top-3 right-4 text-blue-600 hover:text-blue-800 focus:outline-none"
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? (
//                     <FaEyeSlash size={18} className="cursor-pointer" />
//                   ) : (
//                     <FaEye size={18} className="cursor-pointer" />
//                   )}
//                 </button>
//               </div>

//               <div className="text-right">
//                 <Link
//                   to=""
//                   className="link link-hover text-blue-600 hover:text-blue-800"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>

//               <button
//                 type="submit"
//                 className="btn bg-blue-600 hover:bg-blue-700 text-white w-full mt-4 transition-all rounded-md"
//               >
//                 Register
//               </button>

//               <p className="text-sm text-center mt-4 text-gray-600">
//                 Already have an account?{" "}
//                 <Link
//                   to="/login"
//                   className="text-blue-600 underline hover:text-blue-800"
//                 >
//                   Login
//                 </Link>
//               </p>
//             </form>

//             <div className="divider">OR</div>

//             <motion.div
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               onHoverStart={() => console.log("hover started!")}
//               className="mt-4 text-center"
//             >
//               <SocialLogin />
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

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
      const res = await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
        photoURL,
      });

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
              className="w-full font-semibold py-3 rounded-lg transition"
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
