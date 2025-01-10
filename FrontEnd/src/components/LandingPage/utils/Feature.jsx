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

        <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: FaDatabase,
              title: "Custom Built API",
              color: "indigo-500",
              description:
                "Create and integrate custom APIs that bring the latest news from reliable sources directly into your platform.",
            },
            {
              icon: FaGlobe,
              title: "Web Scraping from Verified Sources",
              color: "green-500",
              description:
                "Gather real-time data from credible, verified news websites to ensure the most up-to-date coverage.",
            },
            {
              icon: FaEnvelope,
              title: "News Article Mail Notifications",
              color: "blue-500",
              description:
                "Subscribe to receive daily or weekly email notifications about the latest trending news articles.",
            },
            {
              icon: FaUserCheck,
              title: "Personalized News",
              color: "purple-500",
              description:
                "Get news tailored to your preferences, based on your reading habits and interests.",
            },
            {
              icon: FaMapMarkerAlt,
              title: "Local News Scraping",
              color: "red-500",
              description:
                "Receive news updates based on your location. Stay informed about what's happening near you.",
            },
            {
              icon: FaCheckCircle,
              title: "Verified News Submission",
              color: "teal-500",
              description:
                "Submit news articles that are fact-checked and verified to ensure they meet quality standards.",
            },
            {
              icon: FaMagic,
              title: "Fact-Checked Badge",
              color: "yellow-500",
              description:
                "News articles with a 'Fact-Checked' badge are verified for accuracy and reliability.",
            },
            {
              icon: FaNewspaper,
              title: "News Summaries",
              color: "indigo-400",
              description:
                "Summarized versions of news stories, so you can stay informed without spending too much time reading.",
            },
            {
              icon: FaComments,
              title: "Discussion Section",
              color: "pink-500",
              description:
                "Engage with others through comments and discussions to share opinions and perspectives on news stories.",
            },
            {
              icon: FaRegCalendarAlt,
              title: "Local Events Scraping",
              color: "orange-500",
              description:
                "Stay informed about local events and activities happening in your area with real-time scraping.",
            },
            {
              icon: FaGlobe,
              title: "Local Communities",
              color: "green-600",
              description:
                "Join and interact with your local community. Share news, events, and information relevant to your city.",
            },
            {
              icon: FaNewspaper,
              title: "Shorts",
              color: "red-600",
              description:
                "Quick, bite-sized news updates designed for readers who want fast information in a short format.",
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
              <p className="mt-4 text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

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
