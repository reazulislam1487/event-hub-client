import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/dashboard/add-events", label: "Add Events" },
    { path: "/dashboard/my-events", label: "My Events List" },
    { path: "/dashboard/all-events", label: "All Events" },
  ];

  return (
    <>
      {/* Hamburger (Mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-3 left-3 z-[60] p-2 bg-white text-[#2F855A] shadow-md rounded-full hover:bg-[#A0DAB6] transition"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 h-full w-64 z-50 transition-transform duration-300 ease-in-out bg-gradient-to-b from-[#F9F9F6] via-[#A0DAB6]/40 to-[#F9F9F6] shadow-lg md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="pt-20 md:pt-8 px-6 pb-8 h-full flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Brand */}
            <h2 className="text-2xl font-extrabold text-[#2F855A] mb-8 hidden md:block tracking-wide">
              Marathon Panel
            </h2>

            {/* Navigation */}
            <nav className="space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center text-sm gap-4 px-2 py-1 bg-white border border-[#E5E7EB] rounded shadow-sm hover:bg-[#A0DAB6]/20 hover:border-[#A0DAB6] transition-all duration-200"
                >
                  <span className="text-lg font-medium text-[#2D3748]">
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Footer / Back */}
          <div className="mt-10">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center btn gap-2 text-[#2F855A] font-medium hover:underline hover:text-[#38A169] transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;
