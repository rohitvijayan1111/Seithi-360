import React from "react";
import Header from "./Header/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TopNewsCarousel from "./Utils/Carousel";
import LocalNewsTicker from "./Utils/LocalNewsTicker";

const Feed = () => {
  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      {/* Header Section */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 space-y-8">
        {/* Top News Section */}
       
          <h2 className="text-2xl font-bold mb-4">Top News</h2>
          <div className="">
            <TopNewsCarousel />
          </div>
        

        {/* Local News Ticker Section */}
       
          <h2 className="text-2xl font-bold mb-4">Local News</h2>
            <LocalNewsTicker />
         
       

        {/* Additional Section (if needed) */}
        {/* <section>
          <h2 className="text-2xl font-bold mb-4">Embedded RSS Feed</h2>
          <iframe
            width="100%"
            height="600"
            src="https://rss.app/embed/v1/wall/dtpL0LmJRlJUSJ7t"
            frameBorder="0"
            className="rounded-lg shadow-lg"
          ></iframe>
        </section> */}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-8 text-center">
        <p>&copy; 2025 NewsFeed. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Feed;
