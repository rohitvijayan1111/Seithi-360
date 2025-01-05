import { motion } from "framer-motion";

export default function LogoDisplay() {
  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="flex items-center justify-center space-x-12 bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* KYNhood Logo */}
          <div className="flex items-center justify-center">
            <motion.img
              src="https://www.kynhood.com/illustrations/logo.png" // Add the actual path to your KYNhood logo
              alt="KYNhood Logo"
              width={160} // Adjust the width for a more prominent display
              height={60} // Adjust the height to maintain the logo aspect ratio
              className="rounded-lg shadow-md"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            />
          </div>

          {/* KYN X Seithi360 Text */}
          <motion.p
            className="text-2xl font-bold text-gray-800 text-center mx-6 uppercase tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            KYN X செய்தி360
          </motion.p>

          {/* Seithi360 Logo */}
          <div className="flex items-center justify-center">
            <motion.img
              src="https://cdn-icons-png.flaticon.com/128/11922/11922419.png" // Add the actual path to your Seithi360 logo
              alt="Seithi360 Logo"
              width={160} // Adjust the width to make both logos similar in size
              height={60} // Adjust the height for consistency
              className="rounded-lg shadow-md"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
