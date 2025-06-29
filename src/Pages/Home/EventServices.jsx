import React from "react";
import {
  FaSmile,
  FaGift,
  FaChartPie,
  FaStar,
  FaGlasses,
  FaGem,
} from "react-icons/fa";

const services = [
  {
    icon: <FaSmile className="text-[#00B894] text-4xl" />,
    title: "Anniversaries",
    description:
      "Celebrate love and milestones with beautifully managed anniversary events tailored to your needs.",
  },
  {
    icon: <FaGift className="text-[#00B894] text-4xl" />,
    title: "Holiday Parties",
    description:
      "Joyful and stress-free holiday gatherings with flawless execution and festive vibes.",
  },
  {
    icon: <FaChartPie className="text-[#00B894] text-4xl" />,
    title: "Corporate Functions",
    description:
      "From meetings to galas — seamless corporate event planning to elevate your brand.",
  },
  {
    icon: <FaStar className="text-[#00B894] text-4xl" />,
    title: "Fashion Concerts",
    description:
      "Dazzling show management for high-profile concerts, fashion walks, and celebrity events.",
  },
  {
    icon: <FaGlasses className="text-[#00B894] text-4xl" />,
    title: "Conference Planning",
    description:
      "Professional conference coordination for educational, tech, and business sectors.",
  },
  {
    icon: <FaGem className="text-[#00B894] text-4xl" />,
    title: "Stage Decorations",
    description:
      "Creative, thematic, and high-impact stage setups that elevate any occasion.",
  },
];

const EventServices = () => {
  return (
    <section className="bg-[#FFF9F0] py-20 px-6  text-center text-[#2D3436]">
      <h2 className="text-4xl md:text-5xl font-semibold mb-6">
        The{" "}
        <span className="text-[#2F855A] font-extrabold">Event Management</span>{" "}
        Specialists
      </h2>
      <p className="text-[#636e72] max-w-3xl mx-auto mb-14 text-base md:text-lg">
        From Wedding Functions to Birthday Parties or Corporate Events to
        Musical Functions, we offer a full range of Events Management Services
        that scale to your needs & budget.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition border border-[#F4F6F8]"
          >
            <div className="mb-4">{service.icon}</div>
            <h4 className="text-lg font-semibold mb-2">{service.title}</h4>
            <p className="text-sm text-[#636e72] leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventServices;
