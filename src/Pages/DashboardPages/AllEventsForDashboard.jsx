import React, { useEffect, useState } from "react";
import axios from "axios";
import usePageTitle from "../../hooks/usePageTitle";
import Loading from "../Shared/Loading";
import useAuth from "../../hooks/useAuth";
import JoinButton from "./JoinButton";
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
  const [dateFilter, setDateFilter] = useState("");

  // Fetch events
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://event-hub-server-one.vercel.app/events?sort=${sortOrder}`)
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch events:", err);
        setLoading(false);
      });
  }, [sortOrder]);

  // Date filter logic
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
    <div className="bg-[#FFF9F0] px-6 py-10 min-h-screen rounded-xl">
      <h2 className="text-4xl font-bold text-center text-[#2F855A] mb-10">
        All Events
      </h2>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full md:w-auto border border-[#2F855A] text-[#2D3748] px-4 py-2 rounded-md focus:ring-2 focus:ring-[#F6C26B]"
        >
          <option value="desc">Newest Events</option>
          <option value="asc">Oldest Events</option>
        </select>

        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full md:w-auto border border-[#2F855A] text-[#2D3748] px-4 py-2 rounded-md focus:ring-2 focus:ring-[#F6C26B]"
        >
          <option value="">All Dates</option>
          <option value="today">Today</option>
          <option value="thisWeek">Current Week</option>
          <option value="lastWeek">Last Week</option>
          <option value="thisMonth">Current Month</option>
          <option value="lastMonth">Last Month</option>
        </select>
      </div>

      {/* Event Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => {
          const isUserJoined = event.joinedUsers?.includes(user?.email);
          return (
            <div
              key={event._id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition flex flex-col justify-between"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-[#2F855A]">
                  {event.title}
                </h3>
                <p className="text-[#2D3748]">
                  <strong>Posted by:</strong> {event.name}
                </p>
                <p className="text-[#2D3748]">
                  <strong>Date & Time:</strong>{" "}
                  {new Date(event.datetime).toLocaleString()}
                </p>
                <p className="text-[#2D3748]">
                  <strong>Location:</strong> {event.location}
                </p>
                <p className="text-sm text-gray-600">{event.description}</p>
                <p className="text-[#2F855A] font-semibold">
                  Attendees: {event.attendeeCount}
                </p>
              </div>

              {/* Join Button */}
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
