"use client";

import { motion } from "framer-motion";
import BentoGrid from "../utils/Grids";

const newsItems = [
  {
    title: "Breaking News 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Feature Update",
    description: "Our platform now supports real-time notifications.",
  },
  {
    title: "User Success Story",
    description: "Discover how Seithi360 transformed communities.",
  },
  {
    title: "Upcoming Event",
    description: "Join our live webinar next week!",
  },
  {
    title: "Milestone Achieved",
    description: "We’ve surpassed 1 million active users!",
  },
];

const marqueeVariants = {
  animate: {
    x: ["100%", "-100%"], // Scroll from right to left
    transition: {
      x: {
        repeat: Infinity,
        duration: 30, // Slow down the scroll speed by increasing the duration
        ease: "linear",
      },
    },
  },
};

export default function AboutUsSection() {
  return (
    <section className="bg-gray-50 py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          About Us
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Learn more about our mission and what we do at Seithi360.
        </p>
      </div>

      {/* Scrolling Cards */}
      <div className="relative mt-12 overflow-hidden">
        <motion.div
          className="flex space-x-6"
          variants={marqueeVariants}
          animate="animate"
        >
          {newsItems.map((item, index) => (
            <div
              key={index}
              className="flex-none w-64 p-4 rounded-lg bg-white shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </motion.div>
        <BentoGrid />
      </div>
    </section>
  );
}
