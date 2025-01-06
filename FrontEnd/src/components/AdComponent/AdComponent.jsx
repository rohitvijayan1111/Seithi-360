import React from "react";

const AdComponent = ({ ad }) => {
  return (
    <div className="max-w-full w-full bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Ad Image Section */}
      <div className="relative h-48 bg-gray-200">
        <img
          src={ad.imageUrl}
          alt="Advertisement"
          className="w-full h-full object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 bg-black opacity-25 rounded-t-lg"></div>
        <p className="absolute text-center w-full h-full flex justify-center items-center text-white font-semibold text-xl">
          Advertisement
        </p>
      </div>

      {/* Ad Content Section */}
      <div className="p-4 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {ad.title}
        </h3>
        <p className="text-sm text-gray-600">{ad.description}</p>
        <a
          href="#"
          className="block text-center py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
        >
          Shop Now
        </a>
      </div>
    </div>
  );
};

export default AdComponent;
