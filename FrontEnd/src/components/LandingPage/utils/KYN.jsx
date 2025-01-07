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
          <div className="flex items-center justify-center">
            <motion.img
              src="https://www.kynhood.com/illustrations/logo.png"
              alt="KYNhood Logo"
              width={160} 
              height={60} 
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

          <div className="flex items-center justify-center">
            <motion.img
              src="seithi360-logo-bg.png" 
              alt="Seithi360 Logo"
              width={160} 
              height={60} 
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
