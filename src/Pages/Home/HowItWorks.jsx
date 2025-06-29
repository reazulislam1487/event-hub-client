import React from "react";
import { FaCalendarCheck, FaUsers, FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";

const HowItWorksAlt = () => {
  return (
    <section className="py-14 px-6  bg-[#F9F9F6] text-[#2D3748]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-14"
        >
          🚀 Your Event Journey with{" "}
          <span className="text-[#2F855A]">Event Hub</span>
        </motion.h2>

        {/* Timeline Style */}
        <div className="relative pl-6 md:pl-10 border-l-2 border-[#A0DAB6]/40 space-y-16">
          {/* Step 1 */}
          <div className="relative group">
            <div className="absolute -left-6 md:-left-9 top-0 w-10 h-10 bg-[#2F855A] text-white rounded-full flex items-center justify-center shadow-md">
              <FaCalendarCheck />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold mb-2">Discover Events</h3>
              <p className="text-gray-600 max-w-xl">
                Explore a wide range of events tailored to your interests — from
                hackathons to music nights and career fairs.
              </p>
            </motion.div>
          </div>

          {/* Step 2 */}
          <div className="relative group">
            <div className="absolute -left-6 md:-left-9 top-0 w-10 h-10 bg-[#A0DAB6] text-white rounded-full flex items-center justify-center shadow-md">
              <FaUsers />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-2">Connect Instantly</h3>
              <p className="text-gray-600 max-w-xl">
                Join with a click, invite your friends, and start networking
                with like-minded individuals in your community.
              </p>
            </motion.div>
          </div>

          {/* Step 3 */}
          <div className="relative group">
            <div className="absolute -left-6 md:-left-9 top-0 w-10 h-10 bg-[#F6C26B] text-white rounded-full flex items-center justify-center shadow-md">
              <FaRocket />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-2xl font-semibold mb-2">Experience & Grow</h3>
              <p className="text-gray-600 max-w-xl">
                Attend events, build new skills, make lasting memories, and
                level up your personal and professional journey.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksAlt;
