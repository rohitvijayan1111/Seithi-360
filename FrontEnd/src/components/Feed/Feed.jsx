import React from "react";
import Header from "./Header/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TopNewsCarousel from "./Utils/Carousel";


const Feed = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Header />
      <div className="bg-white text-gray-900 min-h-screen">
        <TopNewsCarousel />
      </div>
      {/* If you want to display the iframe, uncomment the code below */}
      {/* <iframe
        width="900"
        height="1600"
        src="https://rss.app/embed/v1/wall/dtpL0LmJRlJUSJ7t"
        frameborder="0"
        className="w-full h-[1600px] mt-4"
      ></iframe> */}
    </div>
  );
};

export default Feed;
