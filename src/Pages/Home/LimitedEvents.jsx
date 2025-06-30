import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const LimitedEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://event-hub-server-one.vercel.app/events/limited")
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading events:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-[#2F855A] text-xl font-semibold animate-pulse">
          Loading events...
        </p>
      </div>
    );
  }

  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#2F855A] mb-12">
          Featured <span className="text-black">Events</span>
        </h2>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-semibold text-[#2F855A] mb-4">
                  {event.title}
                </h3>

                <p className="text-gray-800 mb-1">
                  <span className="font-semibold">Posted by:</span> {event.name}
                </p>

                <p className="text-gray-800 mb-1">
                  <span className="font-semibold">Date & Time:</span>{" "}
                  {new Date(event.datetime).toLocaleString()}
                </p>

                <p className="text-gray-800 mb-3">
                  <span className="font-semibold">Location:</span>{" "}
                  {event.location}
                </p>

                {event.description && (
                  <p className="text-gray-600 mb-3 text-sm">
                    {event.description}
                  </p>
                )}

                <p className="text-[#2F855A] font-semibold mb-6">
                  Attendees: {event.attendeeCount}
                </p>
              </div>

              <Link
                to="/"
                className={` w-full h-10 flex items-center justify-center rounded-lg text-sm font-medium transition
                  ${
                    event.joinedUsers?.includes(/* userEmail */)
                      ? "bg-gray-300 text-white cursor-not-allowed"
                      : "bg-[#2F855A] hover:bg-[#F6C26B] text-white"
                  }`}
              >
                {event.joinedUsers?.includes(/* userEmail */)
                  ? "Already Joined"
                  : "See More"}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/events"
            className="inline-block bg-[#2F855A] hover:bg-[#F6C26B] text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            See More Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LimitedEvents;
