import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCalendarAlt, FaUserFriends } from "react-icons/fa";

const newEvents = [
  {
    id: 1,
    title: "Startup Launch Expo 2025",
    date: "August 10, 2025",
    location: "Dhaka Innovation Hub",
    attendees: 150,
    image:
      "https://2024.beyondexpo.com/wp-content/uploads/2024/06/2-1024x683.webp",
  },
  {
    id: 2,
    title: "UX/UI Creative Jam",
    date: "September 2, 2025",
    location: "Chattogram Design Center",
    attendees: 80,
    image:
      "https://media.istockphoto.com/id/1265038430/photo/website-designer-creative-planning-phone-app-development-template-layout-framework-wireframe.jpg?s=612x612&w=0&k=20&c=sgKiBYMwfcdw7W4q4lLxwqpm4PovVLZ9CE7wCLbBWHk=",
  },
  {
    id: 3,
    title: "Code & Coffee Meetup",
    date: "September 20, 2025",
    location: "Sylhet IT Café",
    attendees: 45,
    image:
      "https://img.freepik.com/free-photo/close-up-people-eating-break-time_23-2149256934.jpg?semt=ais_hybrid&w=740",
  },
];

const UpComingEvents = () => {
  return (
    <section className="bg-[#FFF9F0] py-20 px-4  text-[#2D3748] overflow-x-hidden">
      {/* Section Heading */}
      <div className="text-center mb-14 px-4">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold"
        >
          🔔 Upcoming <span className="text-[#F6C26B]">Event Hub</span>{" "}
          Highlights
        </motion.h2>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Discover exciting gatherings across Bangladesh — from tech expos to
          community meetups.
        </p>
      </div>

      {/* Events List */}
      <div className="space-y-10 max-w-7xl mx-auto">
        {newEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
            className="flex flex-col md:flex-row items-center gap-6 bg-white shadow-lg rounded-3xl overflow-hidden hover:shadow-2xl transition"
          >
            {/* Image */}
            <img
              src={event.image}
              alt={event.title}
              className="w-full md:w-[300px] h-60 object-cover rounded-t-3xl md:rounded-none md:rounded-l-3xl"
              loading="lazy"
            />

            {/* Event Details */}
            <div className="flex-1 px-6 py-6 space-y-4">
              <h3 className="text-2xl font-bold text-[#2F855A]">
                {event.title}
              </h3>

              <p className="flex items-center gap-2 text-gray-600 text-sm">
                <FaCalendarAlt className="text-[#F6C26B]" /> {event.date}
              </p>

              <p className="flex items-center gap-2 text-gray-600 text-sm">
                <FaMapMarkerAlt className="text-[#2F855A]" /> {event.location}
              </p>

              <p className="flex items-center gap-2 text-gray-600 text-sm">
                <FaUserFriends className="text-[#38A169]" /> {event.attendees}+
                Registered
              </p>

              <button className="mt-3 inline-block bg-[#2F855A] text-white px-5 py-2 rounded-full font-medium hover:bg-[#276749] transition">
                Join Event
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default UpComingEvents;
