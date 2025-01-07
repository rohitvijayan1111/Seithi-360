import React, { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "antd";
import Example from "../Feed/Header/Header";
import axios from "axios";

const fetchYouTubeVideosForSection = async (section) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND}/youtube-videos`, {
      params: { query: section || "Short News" },
    });
    return response.data.videos.map((video) => ({
      title: video.title,
      description: video.description || "No description available",
      imageUrl: video.thumbnail || "https://via.placeholder.com/300x200",
      videoUrl: video.url,
      channel: video.channelName,
      viewCount: video.viewCount,
      pubDate: video.pubDate,
    }));
  } catch (error) {
    console.error(`Error fetching YouTube videos for ${section}:`, error);
    return [];
  }
};

const Shorts = () => {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the active video index
  const [hasMore, setHasMore] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const handleUserInteraction = () => {
    setHasUserInteracted(true);
  };

  useEffect(() => {
    loadMoreVideos();
  }, []);

  const loadMoreVideos = async () => {
    const newVideos = await fetchYouTubeVideosForSection("news shorts");
    setVideos((prevVideos) => [...prevVideos, ...newVideos]);
    setHasMore(newVideos.length > 0);
  };

  // Intersection Observer callback to track active video
  const handleVideoVisibility = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.dataset.index, 10);
        setCurrentIndex(index);
      }
    });
  };

  // Setting up Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(handleVideoVisibility, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // At least 50% visible to mark as active
    });

    const videoContainers = document.querySelectorAll(".video-container");
    videoContainers.forEach((container) => observer.observe(container));

    return () => {
      videoContainers.forEach((container) => observer.unobserve(container));
    };
  }, [videos]);

  return (
    <div className="shorts-page bg-white min-h-screen flex flex-col">
      <Example />
      <div className="mt-0 p-0 flex-grow">
        <InfiniteScroll
          dataLength={videos.length}
          next={loadMoreVideos}
          hasMore={hasMore}
          loader={
            <div className="loading-skeleton">
              <Skeleton.Image active />
              <Skeleton active />
            </div>
          }
          endMessage={<p style={{ textAlign: "center" }}>No more videos</p>}
        >
          <div className="video-list flex flex-col items-center space-y-0">
            {videos.length === 0 ? (
              <div className="loading-skeleton flex flex-col items-center space-y-6">
                <Skeleton.Image active className="w-full h-[70vh]" />
                <Skeleton active className="w-full h-20" />
              </div>
            ) : (
              videos.map((video, index) => (
                <div
                  key={index}
                  className={`video-container flex justify-center items-center w-full ${
                    currentIndex === index ? "block" : "hidden"
                  }`}
                  style={{
                    height: "100vh", // Ensure each video container takes full height
                    overflow: "hidden",
                    display: "flex",
                  }}
                  data-index={index}
                  onClick={handleUserInteraction}
                >
                  {currentIndex === index && (
                    <iframe
                      src={`https://www.youtube.com/embed/${
                        video.videoUrl.split("v=")[1]
                      }?rel=0&modestbranding=1&enablejsapi=1&autoplay=1`}
                      title={video.title}
                      className="w-full h-full"
                      style={{
                        aspectRatio: "9 / 16",
                        maxWidth: "360px",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              ))
            )}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Shorts;