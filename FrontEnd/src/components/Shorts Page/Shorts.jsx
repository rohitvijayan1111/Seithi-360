import React, { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "antd"; // Using Ant Design for skeleton loading
import VideoCard from "./utils/VideoCard";
import Example from "../Feed/Header/Header";

// Mock function to generate fake video data
const fetchVideos = async (page) => {
  return new Array(5).fill(null).map((_, index) => ({
    id: page * 5 + index,
    title: `Short Video ${page * 5 + index + 1}`,
    videoUrl: `https://www.w3schools.com/html/mov_bbb.mp4`, // Fake video URL for now
    views: Math.floor(Math.random() * 10000),
    description: `A short video about tech ${page * 5 + index + 1}`,
  }));
};

const Shorts = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const videoRefs = useRef([]);

  useEffect(() => {
    loadMoreVideos();
  }, []);

  const loadMoreVideos = async () => {
    const newVideos = await fetchVideos(page);
    setVideos((prevVideos) => [...prevVideos, ...newVideos]);
    setHasMore(newVideos.length > 0);
    setPage(page + 1);
  };

  // Intersection Observer callback to play/pause videos based on visibility
  const handleVideoVisibility = (entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
      }
    });
  };

  // Setting up Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(handleVideoVisibility, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Video should be at least 50% visible to play
    });

    // Attach observer to each video
    videoRefs.current.forEach((video) => {
      observer.observe(video);
    });

    // Clean up observer on unmount
    return () => {
      videoRefs.current.forEach((video) => {
        observer.unobserve(video);
      });
    };
  }, [videos]);

  return (
    <div className="shorts-page bg-white min-h-screen flex flex-col">
      <Example />
      <div className="mt-10 p-4">
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
                  key={video.id}
                  className="video-container w-full flex justify-center items-center"
                  style={{ height: "100vh", overflow: "hidden" }}
                >
                  <VideoCard
                    ref={(el) => (videoRefs.current[index] = el)}
                    video={video}
                  />
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
