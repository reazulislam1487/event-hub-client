// import React, { useContext } from "react";

// import { NavLink, useNavigate } from "react-router";
// import { AuthContext } from "../../Contexts/AuthContext";
// import Swal from "sweetalert2";

// const Navbar = () => {
//   const { user, setUser } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const userPic = "https://www.w3schools.com/howto/img_avatar.png"; // Default user picture

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You will be logged out!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, logout!",
//       confirmButtonColor: "#2563EB", // blue
//       cancelButtonColor: "#6B7280", // gray
//     }).then((result) => {
//       if (result.isConfirmed) {
//         setUser(null);
//         localStorage.removeItem("user", user);
//       }
//     });
//   };
//   console.log(user);

//   const links = (
//     <>
//       <li>
//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             isActive
//               ? "text-blue-600 font-semibold border-b-2 border-blue-600"
//               : "hover:text-blue-500 transition"
//           }
//         >
//           Home
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/marathons"
//           className={({ isActive }) =>
//             isActive
//               ? "text-blue-600 font-semibold border-b-2 border-blue-600"
//               : "hover:text-blue-500 transition"
//           }
//         >
//           Events
//         </NavLink>
//       </li>
//       {user && (
//         <li>
//           <NavLink
//             to="/dashboard"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-blue-600 font-semibold border-b-2 border-blue-600"
//                 : "hover:text-blue-500 transition"
//             }
//           >
//             Dashboard
//           </NavLink>
//         </li>
//       )}
//     </>
//   );

//   return (
//     <nav className="navbar bg-gradient-to-b from-blue-100 via-white to-blue-50 shadow-md p-0 pr-2 md:px-6 md:py-3 sticky top-0 z-50">
//       <div className="navbar-start flex items-center gap-4">
//         <div className="dropdown ">
//           <label
//             tabIndex={0}
//             className="btn btn-ghost lg:hidden p-2 rounded-md hover:bg-blue-100 focus:bg-blue-100 focus:outline-none"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6 text-blue-600"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M4 6h16M4 12h8m-8 6h16"
//               />
//             </svg>
//           </label>
//           <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52"
//           >
//             {links}
//           </ul>
//         </div>
//         <NavLink
//           to="/"
//           className="hidden sm:flex text-2xl font-extrabold text-blue-700 select-none"
//         >
//           Event Hub
//         </NavLink>
//       </div>

//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1 gap-6">{links}</ul>
//       </div>

//       <div className="navbar-end flex items-center gap-3">
//         {user ? (
//           <>
//             <div className="relative group inline-block">
//               <img
//                 src={user?.photoURL ? user?.photoURL : userPic}
//                 alt="User"
//                 referrerPolicy="no-referrer"
//                 className="w-10 h-10 rounded-full cursor-pointer"
//               />
//               <span className="absolute bg-black bg-opacity-80 text-white text-sm rounded px-3 py-1 top-1/2 right-full -translate-y-1/2 mr-2 opacity-0 group-hover:opacity-100 transition duration-300 z-10 whitespace-nowrap">
//                 {user?.name}
//               </span>
//             </div>

//             <button
//               onClick={handleLogout}
//               className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white transition"
//             >
//               Log out
//             </button>
//           </>
//         ) : (
//           <>
//             <NavLink
//               to="/login"
//               className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white transition"
//             >
//               Sign In
//             </NavLink>
//             {/* <NavLink
//               to="/register"
//               className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white transition"
//             >
//               Register
//             </NavLink> */}
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";
import Swal from "sweetalert2";
import { FaCalendarAlt } from "react-icons/fa";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const userPic = "https://www.w3schools.com/howto/img_avatar.png";

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
        navigate("/");
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
          <>
            <div className="relative group inline-block">
              <img
                src={user?.photoURL || userPic}
                alt="User"
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-full cursor-pointer border-2 border-[#F6C26B] transition-shadow shadow-md"
              />
              <span className="absolute bg-[#2F855A] bg-opacity-90 text-[#FFF9F0] text-sm rounded px-3 py-1 top-1/2 right-full -translate-y-1/2 mr-2 opacity-0 group-hover:opacity-100 transition duration-300 z-10 whitespace-nowrap font-semibold font-body">
                {user?.name}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="btn btn-sm bg-[#2F855A] hover:bg-[#276e4f] text-[#FFF9F0] font-semibold shadow-md transition focus:outline-none focus:ring-4 focus:ring-[#F6C26B]"
            >
              Log out
            </button>
          </>
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
