import { motion } from "framer-motion";

export default function Brand() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50, rotate: 2 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center text-2xl font-extrabold text-gray-900 sm:text-3xl"
        >
          Trusted by Verified News Sources
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-center text-gray-600 mt-4 text-lg"
        >
          Bringing you the latest from credible platforms. Still Counting...
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto mt-10 grid max-w-lg grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 items-center lg:max-w-none"
        >
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center"
          >
            <img
              alt="Google News"
              src="https://th.bing.com/th/id/OIP.wRz-oGJarvEEcLu_cyoragHaHa?rs=1&pid=ImgDetMain"
              width={158}
              height={48}
              className="max-h-16 object-contain"
            />
            <p className="mt-4 text-lg font-semibold text-gray-800">
              Google News
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center"
          >
            <img
              alt="The Times of India"
              src="https://zillionaireindia.com/cdn/shop/files/14_fbf0178c-e9dd-4995-91c1-aed55ebbfea9_large.jpg?v=1674551350"
              width={158}
              height={48}
              className="max-h-16 object-contain"
            />
            <p className="mt-4 text-lg font-semibold text-gray-800">
              The Times of India
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center"
          >
            <img
              alt="Hindustan Times"
              src="https://cdn.freelogovectors.net/wp-content/uploads/2021/12/hindustan-times-logo-freelogovectors.net_-768x760.png"
              width={158}
              height={48}
              className="max-h-16 object-contain"
            />
            <p className="mt-4 text-lg font-semibold text-gray-800">
              Hindustan Times
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center"
          >
            <img
              alt="NDTV"
              src="https://logodix.com/logo/2131917.png"
              width={158}
              height={48}
              className="max-h-16 object-contain"
            />
            <p className="mt-4 text-lg font-semibold text-gray-800">NDTV</p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center"
          >
            <img
              alt="India Today"
              src="https://seekvectors.com/files/download/27c258551c8be7d9c3c724653bafe636.jpg"
              width={158}
              height={48}
              className="max-h-16 object-contain"
            />
            <p className="mt-4 text-lg font-semibold text-gray-800">
              India Today
            </p>
          </motion.div>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center text-xl font-extrabold text-gray-900 sm:text-2xl mt-16"
        >
          Trusted by Local News Sources
        </motion.h3>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto mt-10 grid max-w-lg grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 items-center lg:max-w-none"
        >
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center"
          >
            <img
              alt="Polimer"
              src="https://yt3.googleusercontent.com/ytc/AIdro_lsZg5AuszjSq2zyrai2A2B7xUF_e24UZLtXgm5NuK3i1nS=s900-c-k-c0x00ffffff-no-rj"
              width={158}
              height={48}
              className="max-h-16 object-contain"
            />
            <p className="mt-4 text-lg font-semibold text-gray-800">Polimer</p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center"
          >
            <img
              alt="Thinathanthi"
              src="https://3.imimg.com/data3/YF/CL/MY-3106798/daily-thanthi.jpg"
              width={158}
              height={48}
              className="max-h-16 object-contain"
            />
            <p className="mt-4 text-lg font-semibold text-gray-800">
              Thinathanthi
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center"
          >
            <img
              alt="Puthiyathalamurai"
              src="https://yt3.googleusercontent.com/PaXj0o9oHCnh6lUeaLURUmxTccEuLSWejfGFZhYNwsgjcz7bxxLEsk2f0cY_7j-hxsOg5Jq18KA=s900-c-k-c0x00ffffff-no-rj"
              width={158}
              height={48}
              className="max-h-16 object-contain"
            />
            <p className="mt-4 text-lg font-semibold text-gray-800">
              Puthiyathalamurai
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center"
          >
            <img
              alt="Dinamalar"
              src="https://india.mom-gmr.org/uploads/tx_lfrogmom/media/16661-1592_import.png"
              width={158}
              height={48}
              className="max-h-16 object-contain"
            />
            <p className="mt-4 text-lg font-semibold text-gray-800">
              Dinamalar
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center"
          >
            <img
              alt="Maalaimalar"
              src="https://media.maalaimalar.com/h-upload/2022/06/24/1718034-eb-pole.jpg"
              width={158}
              height={48}
              className="max-h-16 object-contain"
            />
            <p className="mt-4 text-lg font-semibold text-gray-800">
              Maalaimalar
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center"
          >
            <img
              alt="Dinamani"
              src="https://5.imimg.com/data5/SELLER/Default/2024/2/390039773/HE/SX/FP/17709071/dinamani-newspaper-advertisement-service.jpeg"
              width={158}
              height={48}
              className="max-h-16 object-contain"
            />
            <p className="mt-4 text-lg font-semibold text-gray-800">Dinamani</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-lg">
            And many more trusted sources contributing to reliable news...
          </p>
        </motion.div>
      </div>
    </div>
  );
}
