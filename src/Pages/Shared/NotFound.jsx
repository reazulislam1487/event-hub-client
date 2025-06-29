import React from "react";
import { Link } from "react-router";
import usePageTitle from "../../hooks/usePageTitle";

const NotFound = () => {
  usePageTitle("Page Not Found");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F9F6] px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-[#2F855A] mb-4">
        404
      </h1>
      <h1 className="text-4xl md:text-xl font-extrabold text-[#2D3748] mb-4">
        Page not found
      </h1>

      <p className="text-base md:text-lg text-[#636e72] mb-8 max-w-md">
        Sorry, the page you're looking for doesn't exist or has been moved.
        Let's get you back on track.
      </p>

      <Link
        to="/"
        className="inline-block bg-[#2F855A] hover:bg-[#276749] text-white font-semibold px-6 py-3 rounded-full shadow transition"
      >
        ⬅ Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
