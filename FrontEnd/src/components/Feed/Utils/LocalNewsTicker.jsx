import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios"; // Ensure axios is installed and imported

const LocalNewsTicker = () => {
  const [localNews, setLocalNews] = useState([]);
  const district = sessionStorage.getItem("district");

  // Fetch articles from the server
  const fetchScrapedArticles = async (query) => {
    try {
      const response = await axios.get("http://localhost:5000/scrape3", {
        params: { q: query || "Trending News" },
      });
      return response.data.articles || [];
    } catch (error) {
      console.error("Error fetching scraped articles:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadLocalNews = async () => {
      const query = district ? `${district} News` : "Trending News";
      const articles = await fetchScrapedArticles(query);

      // Transform articles into the required format
      const formattedArticles = articles.map((article) => ({
        title: article.title,
        description: article.source || "No description available",
        imageUrl: article.imgSrc || "https://via.placeholder.com/300x200",
        url: article.url,
      }));

      setLocalNews(formattedArticles);
    };

    loadLocalNews();
  }, [district]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="bg-gray-100 py-6">
      {localNews.length > 0 ? (
        <Slider {...settings}>
          {localNews.map((news, index) => (
            <div key={index} className="p-4">
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden transition-shadow duration-300">
                <img
                  src={news.imageUrl}
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {news.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {news.description}
                  </p>
                  <a
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm mt-2 block"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="flex justify-center items-center h-48">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      
      )}
    </div>
  );
};

export default LocalNewsTicker;
