// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import usePageTitle from "../../hooks/usePageTitle";
// import Loading from "../Shared/Loading";
// import useAuth from "../../hooks/useAuth";
// import JoinButton from "./JoinButton";
// import FilterBar from "./FilterBar";
// import {
//   isToday,
//   isWithinInterval,
//   startOfWeek,
//   endOfWeek,
//   subWeeks,
//   startOfMonth,
//   endOfMonth,
//   subMonths,
// } from "date-fns";

// const AllEvents = () => {
//   usePageTitle("All Events");
//   const { user } = useAuth();
//   const [events, setEvents] = useState([]);
//   const [filteredEvents, setFilteredEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [searchText, setSearchText] = useState("");
//   const [dateFilter, setDateFilter] = useState("");
//   const onFilter = ({ search, date, range }) => {
//     setSearchText(search);
//     setDateFilter(date);
//     setSortOrder(range);
//   };

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(
//         `http://localhost:5000/events?search=${searchText}&sort=${sortOrder}`
//       )
//       .then((res) => {
//         setEvents(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch events:", err);
//         setLoading(false);
//       });
//   }, [searchText, sortOrder, dateFilter]);

//   useEffect(() => {
//     if (!dateFilter) {
//       setFilteredEvents(events);
//       return;
//     }

//     const now = new Date();
//     let filtered = [];

//     if (dateFilter === "today") {
//       filtered = events.filter((e) => isToday(new Date(e.datetime)));
//     } else if (dateFilter === "thisWeek") {
//       filtered = events.filter((e) =>
//         isWithinInterval(new Date(e.datetime), {
//           start: startOfWeek(now),
//           end: endOfWeek(now),
//         })
//       );
//     } else if (dateFilter === "lastWeek") {
//       const lastWeekStart = startOfWeek(subWeeks(now, 1));
//       const lastWeekEnd = endOfWeek(subWeeks(now, 1));
//       filtered = events.filter((e) =>
//         isWithinInterval(new Date(e.datetime), {
//           start: lastWeekStart,
//           end: lastWeekEnd,
//         })
//       );
//     } else if (dateFilter === "thisMonth") {
//       filtered = events.filter((e) =>
//         isWithinInterval(new Date(e.datetime), {
//           start: startOfMonth(now),
//           end: endOfMonth(now),
//         })
//       );
//     } else if (dateFilter === "lastMonth") {
//       const lastMonth = subMonths(now, 1);
//       filtered = events.filter((e) =>
//         isWithinInterval(new Date(e.datetime), {
//           start: startOfMonth(lastMonth),
//           end: endOfMonth(lastMonth),
//         })
//       );
//     }

//     setFilteredEvents(filtered);
//   }, [dateFilter, events]);

//   if (loading) return <Loading />;

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">
//         All Events
//       </h2>

//       {/* Use the FilterBar component */}
//       <FilterBar
//         searchText={searchText}
//         setSearchText={setSearchText}
//         sortOrder={sortOrder}
//         setSortOrder={setSortOrder}
//         dateFilter={dateFilter}
//         setDateFilter={setDateFilter}
//         onFilter={onFilter}
//       />

//       <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {filteredEvents.map((event) => {
//           const isUserJoined = event.joinedUsers?.includes(user?.email);
//           return (
//             <div
//               key={event._id}
//               className="bg-white shadow-md rounded-xl p-5 space-y-3 hover:shadow-lg transition duration-300"
//             >
//               <h3 className="text-2xl font-bold text-blue-700">
//                 {event.title}
//               </h3>
//               <p className="text-gray-700">
//                 <strong>Posted by:</strong> {event.name}
//               </p>
//               <p className="text-gray-700">
//                 <strong>Date & Time:</strong>{" "}
//                 {new Date(event.datetime).toLocaleString()}
//               </p>
//               <p className="text-gray-700">
//                 <strong>Location:</strong> {event.location}
//               </p>
//               <p className="text-gray-600">{event.description}</p>
//               <p className="text-gray-700 font-semibold">
//                 Attendees: {event.attendeeCount}
//               </p>
//               <JoinButton
//                 eventId={event._id}
//                 userEmail={user?.email}
//                 initialJoined={isUserJoined}
//               />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default AllEvents;

import React, { useEffect, useState } from "react";
import axios from "axios";
import usePageTitle from "../../hooks/usePageTitle";
import Loading from "../Shared/Loading";
import useAuth from "../../hooks/useAuth";
import JoinButton from "./JoinButton";
import FilterBar from "./FilterBar";
import {
  isToday,
  isWithinInterval,
  startOfWeek,
  endOfWeek,
  subWeeks,
  startOfMonth,
  endOfMonth,
  subMonths,
} from "date-fns";

const AllEvents = () => {
  usePageTitle("All Events");
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchText, setSearchText] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const onFilter = ({ search, date, range }) => {
    setSearchText(search);
    setDateFilter(date);
    setSortOrder(range);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://localhost:5000/events?search=${searchText}&sort=${sortOrder}`
      )
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch events:", err);
        setLoading(false);
      });
  }, [searchText, sortOrder, dateFilter]);

  useEffect(() => {
    if (!dateFilter) {
      setFilteredEvents(events);
      return;
    }

    const now = new Date();
    let filtered = [];

    if (dateFilter === "today") {
      filtered = events.filter((e) => isToday(new Date(e.datetime)));
    } else if (dateFilter === "thisWeek") {
      filtered = events.filter((e) =>
        isWithinInterval(new Date(e.datetime), {
          start: startOfWeek(now),
          end: endOfWeek(now),
        })
      );
    } else if (dateFilter === "lastWeek") {
      const lastWeekStart = startOfWeek(subWeeks(now, 1));
      const lastWeekEnd = endOfWeek(subWeeks(now, 1));
      filtered = events.filter((e) =>
        isWithinInterval(new Date(e.datetime), {
          start: lastWeekStart,
          end: lastWeekEnd,
        })
      );
    } else if (dateFilter === "thisMonth") {
      filtered = events.filter((e) =>
        isWithinInterval(new Date(e.datetime), {
          start: startOfMonth(now),
          end: endOfMonth(now),
        })
      );
    } else if (dateFilter === "lastMonth") {
      const lastMonth = subMonths(now, 1);
      filtered = events.filter((e) =>
        isWithinInterval(new Date(e.datetime), {
          start: startOfMonth(lastMonth),
          end: endOfMonth(lastMonth),
        })
      );
    }

    setFilteredEvents(filtered);
  }, [dateFilter, events]);

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-[#2F855A] mb-10">
        All Events
      </h2>

      <FilterBar
        searchText={searchText}
        setSearchText={setSearchText}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        onFilter={onFilter}
      />

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
        {filteredEvents.map((event) => {
          const isUserJoined = event.joinedUsers?.includes(user?.email);
          return (
            <div
              key={event._id}
              className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#2F855A]">
                  {event.title}
                </h3>
                <p className="text-gray-700">
                  <strong>Posted by:</strong> {event.name}
                </p>
                <p className="text-gray-700">
                  <strong>Date & Time:</strong>{" "}
                  {new Date(event.datetime).toLocaleString()}
                </p>
                <p className="text-gray-700">
                  <strong>Location:</strong> {event.location}
                </p>
                <p className="text-gray-600 text-sm">{event.description}</p>
                <p className="text-sm font-semibold text-[#2F855A]">
                  Attendees: {event.attendeeCount}
                </p>
              </div>

              <div className="mt-4">
                <JoinButton
                  eventId={event._id}
                  userEmail={user?.email}
                  initialJoined={isUserJoined}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllEvents;
