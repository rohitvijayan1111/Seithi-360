import React, { useState, useEffect } from "react";
import Slider from "react-slick";

const TopNewsCarousel = () => {
  const [topNews, setTopNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://rss.app/feeds/v1.1/dtpL0LmJRlJUSJ7t.json"
        );
        const data = await response.json();
        const items = data.items.map((item) => ({
          title: item.title,
          description: item.content_text,
          imageUrl: item.image,
          url: item.url,
        }));
        setTopNews(items);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    fetchNews();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 640, // Mobile screens
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768, // Tablet screens
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024, // Desktop screens
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {topNews.length > 0 ? (
        <Slider {...settings}>
          {topNews.map((news, index) => (
            <div
              key={index}
              className="relative group rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-105"
            >
              <img
                src={news.imageUrl || "https://via.placeholder.coms/300x200"}
                alt={news.title}
                className="w-full h-48 md:h-56 lg:h-64 object-cover rounded-xl"
              />
              <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full p-4 text-white opacity-80 group-hover:opacity-100 transition-opacity rounded-xl">
                <h3 className="text-lg sm:text-xl font-semibold">
                  {news.title}
                </h3>
                <p className="text-sm sm:text-base mt-2">
                  {news.description}
                </p>
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline mt-2 block"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-500">Loading news...</p>
      )}
    </div>
  );
};

export default TopNewsCarousel;
