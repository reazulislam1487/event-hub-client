import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";
import Swal from "sweetalert2";
import { FiLogOut } from "react-icons/fi";

import { FaCalendarAlt } from "react-icons/fa";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const userPic = "https://www.w3schools.com/howto/img_avatar.png"; // Default user picture
  const [imgSrc, setImgSrc] = useState(user?.photoURL || userPic);
  useEffect(() => {
    // Reset when user changes
    setImgSrc(user?.photoURL || userPic);
  }, [user]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
      confirmButtonColor: "#F6C26B", // secondary golden yellow
      cancelButtonColor: "#718096", // cool gray
    }).then((result) => {
      if (result.isConfirmed) {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/login");
      }
    });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#2F855A] font-semibold border-b-2 border-[#F6C26B]"
              : "text-gray-700 hover:text-[#2F855A] transition"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            isActive
              ? "text-[#2F855A] font-semibold border-b-2 border-[#F6C26B]"
              : "text-gray-700 hover:text-[#2F855A] transition"
          }
        >
          Events
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-[#2F855A] font-semibold border-b-2 border-[#F6C26B]"
                : "text-gray-700 hover:text-[#2F855A] transition"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="navbar bg-[#FFF9F0] shadow-md md:px-6  py-3 sticky top-0 z-50 font-sans text-gray-700">
      <div className="navbar-start  flex items-center gap-5">
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost lg:hidden p-2 rounded-md hover:bg-[#F6C26B]/20 focus:outline-none focus:ring-2 focus:ring-[#F6C26B] transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#2F855A]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-3 shadow-lg bg-white rounded-lg w-56"
          >
            {links}
          </ul>
        </div>
        <FaCalendarAlt className="text-[#F6C26B]  text-3xl" />

        <NavLink
          to="/"
          className={({ isActive }) =>
            `hidden sm:flex text-3xl font-extrabold font-heading select-none transition-colors duration-200 ${
              isActive ? "text-[#2F855A]" : "text-[#2F855A]"
            }`
          }
        >
          Event Hub
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-8">{links}</ul>
      </div>

      <div className="navbar-end flex items-center gap-4">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-11 h-11 border-[3px] border-[#F6C26B] rounded-full overflow-hidden shadow-md transition-transform duration-200 hover:scale-105">
                <img
                  src={imgSrc}
                  alt="User"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onError={() => {
                    if (imgSrc !== userPic) {
                      setImgSrc(userPic); // fallback only if it's not already fallback
                    }
                  }}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-3 shadow-xl dropdown-content bg-[#FFF9F0] rounded-xl w-60 z-50 border border-[#E2E8F0]"
            >
              <li className="mb-2">
                <div className="text-sm text-center font-semibold text-[#2F855A] px-2 py-1 bg-[#A0DAB6] bg-opacity-20 rounded">
                  👤 {user?.name}
                </div>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full flex cursor-pointer items-center justify-between px-4 py-2 rounded-md text-[#E53E3E] hover:bg-[#FED7D7] font-medium transition-all"
                >
                  <span>Logout</span>
                  <FiLogOut className="ml-2" />
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <NavLink
            to="/login"
            className="btn btn-sm bg-[#2F855A] hover:bg-[#276e4f] text-[#FFF9F0] font-semibold shadow-md transition focus:outline-none focus:ring-4 focus:ring-[#F6C26B]"
          >
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
