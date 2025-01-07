"use client";

import { motion } from "framer-motion";
import BentoGrid from "../utils/Grids";
import {
  FaUsers,
  FaRegNewspaper,
  FaPaperclip,
  FaGlobe,
  FaRegEnvelope,
  FaVideo,
} from "react-icons/fa";

const newsItems = [
  {
    title: "Seithi360 Overview",
    description:
      "Seithi360 is a feature-rich news aggregator designed to empower communities by curating accurate, personalized news from verified sources.",
    icon: <FaRegNewspaper className="h-6 w-6 text-gray-600" />,
  },
  {
    title: "Multi-language Support",
    description:
      "The platform delivers news in multiple languages, making it accessible to diverse audiences.",
    icon: <FaGlobe className="h-6 w-6 text-gray-600" />,
  },
  {
    title: "Tailored News Updates",
    description:
      "Stay informed with customized email updates based on your location and interests.",
    icon: <FaRegEnvelope className="h-6 w-6 text-gray-600" />,
  },
  {
    title: "Community-Driven News",
    description:
      "Join communities to access related news and engage with like-minded individuals.",
    icon: <FaUsers className="h-6 w-6 text-gray-600" />,
  },
  {
    title: "Shorts Feature",
    description:
      "Catch up quickly with bite-sized news highlights through our Shorts feature.",
    icon: <FaVideo className="h-6 w-6 text-gray-600" />,
  },
  {
    title: "Trusted Sources",
    description:
      "Leverage custom web scraping and trusted APIs to ensure news is reliable and up-to-date.",
    icon: <FaPaperclip className="h-6 w-6 text-gray-600" />,
  },
];

const marqueeVariants = {
  animate: {
    x: ["100%", "-100%"], 
    transition: {
      x: {
        repeat: Infinity,
        duration: 30, 
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
              <div className="flex items-center space-x-4">
                {item.icon}
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </motion.div>
        <BentoGrid />
      </div>
    </section>
  );
}
