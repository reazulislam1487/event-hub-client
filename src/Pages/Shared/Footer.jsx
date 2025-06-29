import React from "react";
import { Link } from "react-router";
import { FaCalendarAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2F855A] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FaCalendarAlt className="text-[#FDCB6E] text-3xl" />
            <span className="text-2xl font-bold tracking-wide">Event Hub</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-100">
            Your all-in-one destination for discovering, hosting, and joining
            meaningful events that connect communities and inspire engagement.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-lg font-semibold text-[#FDCB6E] mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-white transition">
                Browse Events
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-white transition">
                My Dashboard
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-lg font-semibold text-[#FDCB6E] mb-4">
            Resources
          </h4>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>
              <Link to="#" className="hover:text-white transition">
                Event Guidelines
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white transition">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white transition">
                Community Standards
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white transition">
                Blog & Tips
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-lg font-semibold text-[#FDCB6E] mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>
              <Link to="#" className="hover:text-white transition">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white transition">
                Cookies Policy
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-white/20 pt-6 text-center text-sm text-gray-200">
        © {new Date().getFullYear()} Event Hub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
