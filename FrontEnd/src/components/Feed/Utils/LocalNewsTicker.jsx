import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LocalNewsTicker = () => {
  const localNews = [
    {
      title: "City Hosts Annual Tech Expo",
      description: "The latest in tech and innovation on display downtown.",
      imageUrl: "https://via.placeholder.com/300x200/FF5733/fff?text=News+1",
    },
    {
      title: "Local Park Renovations Complete",
      description: "Enjoy the newly revamped city park with modern facilities.",
      imageUrl: "https://via.placeholder.com/300x200/33B5FF/fff?text=News+2",
    },
    {
      title: "Community Clean-Up Drive This Weekend",
      description: "Join hands to keep our city clean and green.",
      imageUrl: "https://via.placeholder.com/300x200/FFC300/fff?text=News+3",
    },
    {
      title: "New Coffee Shop Opens Downtown",
      description: "A cozy spot to enjoy your favorite brew.",
      imageUrl: "https://via.placeholder.com/300x200/DAF7A6/fff?text=News+4",
    },
    {
      title: "Local High School Wins Championship",
      description: "Celebrating the victory of our local sports heroes.",
      imageUrl: "https://via.placeholder.com/300x200/9B59B6/fff?text=News+5",
    },
  ];

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
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LocalNewsTicker;
