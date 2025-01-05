import React from "react";
import Slider from "react-slick";

const TopNewsCarousel = () => {
  const topNews = [
    {
      title: "Breaking News: World Economy Rebounds",
      description:
        "Global markets are showing signs of recovery after a year-long downturn.",
      imageUrl: "https://via.placeholder.com/300x200/FF5733/fff?text=News+1",
    },
    {
      title: "Tech Giants Announce New AI Innovations",
      description:
        "Leading tech companies unveil their most advanced AI models yet.",
      imageUrl: "https://via.placeholder.com/300x200/33B5FF/fff?text=News+2",
    },
    {
      title: "Climate Change: New Policies on the Horizon",
      description:
        "World leaders gather to discuss the future of climate action.",
      imageUrl: "https://via.placeholder.com/300x200/FFC300/fff?text=News+3",
    },
    {
      title: "SpaceX Launches New Mars Mission",
      description:
        "NASA and SpaceX team up for an ambitious Mars exploration mission.",
      imageUrl: "https://via.placeholder.com/300x200/DAF7A6/fff?text=News+4",
    },
    {
      title: "New Advances in Medical Research",
      description:
        "Groundbreaking discoveries in cancer treatment and gene therapy.",
      imageUrl: "https://via.placeholder.com/300x200/9B59B6/fff?text=News+5",
    },
  ];

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
      <Slider {...settings}>
        {topNews.map((news, index) => (
          <div
            key={index}
            className="relative group rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-105"
          >
            <img
              src={news.imageUrl}
              alt={news.title}
              className="w-full h-48 md:h-56 lg:h-64 object-cover rounded-xl"
            />
            <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full p-4 text-white opacity-80 group-hover:opacity-100 transition-opacity rounded-xl">
              <h3 className="text-lg sm:text-xl font-semibold">{news.title}</h3>
              <p className="text-sm sm:text-base mt-2">{news.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TopNewsCarousel;
