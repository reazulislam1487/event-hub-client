import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const slides = [
  {
    id: 1,
    title: (
      <>
        Welcome to <span className="text-[#F6C26B]">Event Hub</span>
      </>
    ),
    description:
      "Your one-stop platform to discover, join, and create amazing events around you.",
    btnText: "Explore Events",
    btnLink: "/events",
  },
  {
    id: 2,
    title: (
      <>
        Connect with <span className="text-[#F6C26B]">Event Enthusiasts</span>
      </>
    ),
    description:
      "Meet like-minded people, share experiences, and make every event memorable.",
    btnText: "Join the Community",
    btnLink: "/community",
  },
  {
    id: 3,
    title: (
      <>
        Manage Your <span className="text-[#F6C26B]">Events Easily</span>
      </>
    ),
    description:
      "Create, organize, and track your events with our powerful tools and dashboard.",
    btnText: "Get Started",
    btnLink: "/create-event",
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    position: "absolute",
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "relative",
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    position: "absolute",
  }),
};

const HeroSlider = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const slideIndex = ((page % slides.length) + slides.length) % slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(interval);
  }, [page]);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  // Background image URL — replace with your own or a trusted source
  const bgImageUrl =
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80";

  return (
    <section
      className="relative overflow-hidden rounded-b-3xl shadow-lg select-none"
      style={{ height: "450px" }} // fixed height here
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-50"
        style={{ backgroundImage: `url(${bgImageUrl})` }}
        aria-hidden="true"
      />

      {/* Content container with padding and relative z-index */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-16 py-24 text-white">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={slides[slideIndex].id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
              {slides[slideIndex].title}
            </h1>
            <p className="max-w-3xl text-lg md:text-xl mb-10 drop-shadow-md">
              {slides[slideIndex].description}
            </p>
            <Link
              to={slides[slideIndex].btnLink}
              className="inline-block bg-[#F6C26B] text-[#2F855A] font-semibold rounded-full px-10 py-4 shadow-lg hover:bg-[#d4a742] transition focus:outline-none focus:ring-4 focus:ring-[#F6C26B]/70"
            >
              {slides[slideIndex].btnText}
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-4">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPage([idx, idx > slideIndex ? 1 : -1])}
              className={`w-4 h-4 rounded-full transition-colors ${
                idx === slideIndex
                  ? "bg-[#F6C26B]"
                  : "bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Left / Right Arrows */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 rounded-full p-2 shadow-md text-[#2F855A] focus:outline-none focus:ring-2 focus:ring-[#F6C26B]"
          aria-label="Previous Slide"
        >
          &#10094;
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 rounded-full p-2 shadow-md text-[#2F855A] focus:outline-none focus:ring-2 focus:ring-[#F6C26B]"
          aria-label="Next Slide"
        >
          &#10095;
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;
