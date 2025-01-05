import React, { useState } from "react";
import Header from "./Header/Header";
import TopNewsCarousel from "./Utils/Carousel";
import LocalNewsTicker from "./Utils/LocalNewsTicker";

import Sidebar from "./Utils/Sidebar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainNewsComponent from "./Utils/MainNews";

const Feed = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const district = sessionStorage.getItem("district");
  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      {/* Header Section */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4">
        {/* Top News Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Top News</h2>
          <TopNewsCarousel />
        </section>

      {/* Local News Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Local News {district ? `- ${district}` : ""}
          </h2>
          <LocalNewsTicker />
        </section>


        {/* Grid Layout: Main News and Sidebar */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Main News Component (Left) */}
          <div className="lg:col-span-4">
            <MainNewsComponent />
          </div>

          {/* Sidebar (Right) */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          {/* Responsive Sidebar Toggle */}
          <div className="block lg:hidden">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="fixed bottom-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg focus:outline-none"
            >
              ☰
            </button>
            {isSidebarOpen && (
              <div className="fixed top-0 right-0 w-64 h-full bg-gray-800 text-white z-50 p-4 shadow-lg overflow-y-auto">
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="mb-4 text-white text-lg font-bold"
                >
                  ✖ Close
                </button>
                <Sidebar />
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-8 text-center">
        <p>&copy; 2025 NewsFeed. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Feed;
