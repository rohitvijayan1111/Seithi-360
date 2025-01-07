import React from "react";

const Business = () => {
  return (
    <div className="bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
        Business Revenue Model
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-11/12 max-w-6xl">
        {/* Advertisement Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <svg
                className="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h11M9 21V9m0 0L5 5m4 4L13 5m-4 4V2m0 14h11m-6 3l-3-3m0 0l-3 3m3-3v5"
                ></path>
              </svg>
            </div>
            <h2 className="ml-4 text-xl font-semibold text-gray-800">
              Advertisement
            </h2>
          </div>
          <p className="text-gray-600">
            Generate revenue by displaying targeted advertisements to our users.
          </p>
        </div>

        {/* Paid API Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 12H4"
                ></path>
              </svg>
            </div>
            <h2 className="ml-4 text-xl font-semibold text-gray-800">
              Paid API
            </h2>
          </div>
          <p className="text-gray-600">
            Offer developers and businesses access to our premium APIs for
            integration.
          </p>
        </div>

        {/* Local Vendor Ads Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-yellow-100 rounded-full">
              <svg
                className="w-8 h-8 text-yellow-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 9V7a4 4 0 00-8 0v2m2 6h4m-4 0v2a4 4 0 008 0v-2"
                ></path>
              </svg>
            </div>
            <h2 className="ml-4 text-xl font-semibold text-gray-800">
              Local Vendor Ads
            </h2>
          </div>
          <p className="text-gray-600">
            Collaborate with local vendors to display their advertisements on
            our platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Business;
