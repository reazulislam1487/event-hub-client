import React, { useEffect, useState, useCallback } from "react";
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
  const [loading, setLoading] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://event-hub-server-one.vercel.app/events?search=${searchText}&sort=${sortOrder}`
      )
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch events:", err);
        setLoading(false);
      });
  }, [searchText, sortOrder]);

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

  const handleSearch = useCallback(() => {
    setSearchText(inputValue.trim());
  }, [inputValue]);

  const handleClear = () => {
    setInputValue("");
    setSearchText("");
    setDateFilter("");
    setSortOrder("desc");
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-[#FFF9F0] min-h-screen">
      <h2 className="text-4xl font-extrabold text-center text-[#2C3E50] mb-12 tracking-wide">
        All Events
      </h2>

      <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-12 max-w-5xl mx-auto">
        <div className="flex justify-between w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by title or location..."
            className="flex-grow border border-[#00B894] rounded-l-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FDCB6E]"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            onClick={handleSearch}
            className="bg-[#00B894] text-white px-2 py-3 rounded-r-md hover:bg-[#019D7E] transition"
            aria-label="Search"
          >
            Search
          </button>
          <button
            onClick={handleClear}
            className="ml-4 bg-[#FDCB6E] text-[#2C3E50] px-4 py-3 rounded-md hover:bg-[#F6B745] transition"
            aria-label="Clear Filters"
          >
            Clear
          </button>
        </div>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-[#2C3E50] rounded-md px-5 py-3 text-[#2C3E50] focus:ring-2 focus:ring-[#FDCB6E] w-full md:w-48"
        >
          <option value="desc">Newest Events</option>
          <option value="asc">Oldest Events</option>
        </select>

        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border border-[#2C3E50] rounded-md px-5 py-3 text-[#2C3E50] focus:ring-2 focus:ring-[#FDCB6E] w-full md:w-56"
        >
          <option value="">All Dates</option>
          <option value="today">Today</option>
          <option value="thisWeek">Current Week</option>
          <option value="lastWeek">Last Week</option>
          <option value="thisMonth">Current Month</option>
          <option value="lastMonth">Last Month</option>
        </select>
      </div>

      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {filteredEvents.length === 0 ? (
          <p className="text-center col-span-full text-gray-500 text-lg mt-20">
            No events found.
          </p>
        ) : (
          filteredEvents.map((event) => {
            const isUserJoined = event.joinedUsers?.includes(user?.email);
            return (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between transition-transform hover:-translate-y-1 hover:shadow-2xl"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-[#2C3E50] mb-3">
                    {event.title}
                  </h3>
                  <p className="text-[#636e72] mb-1">
                    <strong>Posted by:</strong> {event.name}
                  </p>
                  <p className="text-[#636e72] mb-1">
                    <strong>Date & Time:</strong>{" "}
                    {new Date(event.datetime).toLocaleString()}
                  </p>
                  <p className="text-[#636e72] mb-1">
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p className="text-[#718096] mt-3 mb-5">
                    {event.description}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-[#2C3E50] font-semibold">
                    Attendees: {event.attendeeCount}
                  </p>
                  <JoinButton
                    eventId={event._id}
                    userEmail={user?.email}
                    initialJoined={isUserJoined}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AllEvents;
