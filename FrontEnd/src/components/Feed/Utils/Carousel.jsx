import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { RingLoader } from "react-spinners"; // Importing a loading spinner

const TopNewsCarousel = () => {
  const [topNews, setTopNews] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://rss.app/feeds/v1.1/9MzP9pTs1LpUZkmx.json"
        );
        const data = await response.json();
        const items = data.items.map((item) => ({
          title: item.title,
          description: item.content_text,
          imageUrl: item.image,
          url: item.url,
        }));
        setTopNews(items);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Failed to fetch news:", error);
        setLoading(false); // Ensure loading is stopped if there is an error
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
    autoplaySpeed: 4000,
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
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024, // Desktop screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <RingLoader color="#4B93DC" size={60} />
        </div>
      ) : (
        <Slider {...settings}>
          {topNews.map((news, index) => (
            <div
              key={index}
              className="relative group rounded-xl overflow-hidden shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="w-full h-96 relative">
                <img
                  src={news.imageUrl || "https://via.placeholder.com/800x500"}
                  alt={news.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full p-6 text-white opacity-80 group-hover:opacity-100 transition-opacity rounded-xl">
                <h3 className="text-2xl sm:text-3xl font-semibold mb-3">
                  {news.title}
                </h3>
                <p className="text-md sm:text-lg mb-4 line-clamp-3">
                  {news.description}
                </p>
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline text-lg font-medium"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default TopNewsCarousel;
