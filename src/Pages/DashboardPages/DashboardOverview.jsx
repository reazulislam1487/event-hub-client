import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";
import { FaCalendarAlt, FaUserAlt, FaListUl } from "react-icons/fa";
import axios from "axios";

const DashboardOverview = () => {
  const { user } = useAuth();
  const [allEventsCount, setAllEventsCount] = useState(0);
  const [myEventsCount, setMyEventsCount] = useState(0);

  useEffect(() => {
    axios("https://event-hub-server-one.vercel.app/events")
      .then((res) => setAllEventsCount(res.data.length))
      .catch(console.error);

    if (user?.email) {
      axios(
        `https://event-hub-server-one.vercel.app/my-events?email=${user.email}`
      )
        .then((res) => setMyEventsCount(res.data.length))
        .catch(console.error);
    }
  }, [user?.email]);

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto bg-[#FFF9F0] rounded-xl shadow-sm">
      <h2 className="text-4xl font-bold text-center text-[#2F855A] mb-10">
        Dashboard Overview
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* All Events Card */}
        <Link
          to="/dashboard/all-events"
          className="bg-white border border-[#E5E7EB] p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all text-center flex flex-col items-center gap-3"
        >
          <div className="w-14 h-14 rounded-full bg-[#E6F4EA] flex items-center justify-center">
            <FaCalendarAlt className="text-[#2F855A] text-2xl" />
          </div>
          <h4 className="text-lg font-semibold text-[#2D3748]">All Events</h4>
          <p className="text-3xl font-bold text-[#2F855A]">{allEventsCount}</p>
        </Link>

        {/* My Events Card */}
        <Link
          to="/dashboard/my-events"
          className="bg-white border border-[#E5E7EB] p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all text-center flex flex-col items-center gap-3"
        >
          <div className="w-14 h-14 rounded-full bg-[#E0F7F2] flex items-center justify-center">
            <FaListUl className="text-[#00B894] text-2xl" />
          </div>
          <h4 className="text-lg font-semibold text-[#2D3748]">My Events</h4>
          <p className="text-3xl font-bold text-[#00B894]">{myEventsCount}</p>
        </Link>

        {/* Account Info Card */}
        <div className="bg-white border border-[#E5E7EB] p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all text-center flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-[#FFF5E1] flex items-center justify-center">
            <FaUserAlt className="text-[#FDCB6E] text-2xl" />
          </div>
          <h4 className="text-lg font-semibold text-[#2D3748]">Account</h4>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-6 flex flex-col items-center text-center max-w-md mx-auto">
        <img
          src={user?.photoURL || "https://i.ibb.co/RB7RgY4/user.png"}
          alt="User"
          className="w-24 h-24 rounded-full border-4 border-[#A0DAB6] object-cover mb-4"
        />
        <h3 className="text-xl font-bold text-[#2D3748]">
          {user?.name || "Anonymous User"}
        </h3>
        <p className="text-gray-500">{user?.email}</p>
        <p className="text-sm text-gray-400 mt-1">
          Logged in via Custom Authentication
        </p>
      </div>
    </div>
  );
};

export default DashboardOverview;
