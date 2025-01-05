import {
  FaDatabase,
  FaGlobe,
  FaEnvelope,
  FaUserCheck,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaComments,
  FaNewspaper,
  FaRegCalendarAlt,
  FaMagic,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Feature() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-gray-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Section */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold text-indigo-500 tracking-wide uppercase">
            Powerful Features
          </h2>
          <motion.p
            className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Revolutionizing News Delivery
          </motion.p>
          <motion.p
            className="mt-6 text-lg text-gray-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Explore features that redefine how you access, consume, and interact
            with news. Built to keep you informed, engaged, and connected.
          </motion.p>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: FaDatabase,
              title: "Custom Built API",
              color: "indigo-500",
            },
            {
              icon: FaGlobe,
              title: "Web Scraping from Verified Sources",
              color: "green-500",
            },
            {
              icon: FaEnvelope,
              title: "News Article Mail Notifications",
              color: "blue-500",
            },
            {
              icon: FaUserCheck,
              title: "Personalized News",
              color: "purple-500",
            },
            {
              icon: FaMapMarkerAlt,
              title: "Local News Scraping",
              color: "red-500",
            },
            {
              icon: FaCheckCircle,
              title: "Verified News Submission",
              color: "teal-500",
            },
            { icon: FaMagic, title: "Fact-Checked Badge", color: "yellow-500" },
            { icon: FaNewspaper, title: "News Summaries", color: "indigo-400" },
            {
              icon: FaComments,
              title: "Discussion Section",
              color: "pink-500",
            },
            {
              icon: FaRegCalendarAlt,
              title: "Local Events Scraping",
              color: "orange-500",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-8 bg-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <feature.icon className={`text-${feature.color} text-4xl mb-4`} />
              <h3 className="text-xl font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="mt-4 text-gray-600">
                {feature.description ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="text-lg text-gray-500">
            Discover more innovative features tailored to your news needs.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
