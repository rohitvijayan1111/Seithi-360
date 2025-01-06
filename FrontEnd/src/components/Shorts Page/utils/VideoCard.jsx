import React, { useRef, useEffect, useState } from "react";

const VideoCard = React.forwardRef(({ video, onUserInteraction }, ref) => {
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const currentVideoRef = videoRef.current;

    // Handle play/pause on click
    const handleInteraction = () => {
      if (onUserInteraction) {
        onUserInteraction(); // Notify parent component
      }

      // Toggle play/pause state
      setIsVideoPlaying((prev) => !prev);
    };

    // Attach the click handler
    if (currentVideoRef) {
      currentVideoRef.addEventListener("click", handleInteraction);
    }

    return () => {
      if (currentVideoRef) {
        currentVideoRef.removeEventListener("click", handleInteraction);
      }
    };
  }, [onUserInteraction]);

  return (
    <div
      className="video-card bg-white shadow-lg rounded-lg w-full md:w-[80vw] lg:w-[60vw] xl:w-[50vw] h-[80vh] flex flex-col justify-center items-center relative overflow-hidden transition-all duration-500 ease-in-out"
      ref={ref}
    >
      {/* Embed YouTube Shorts using iframe */}
      <iframe
        src={`https://www.youtube.com/embed/${video.videoUrl.split('v=')[1]}`}
        className="video-player w-full h-full object-cover"
        title={video.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <div className="video-info absolute bottom-5 left-5 text-white">
        <h3 className="font-bold text-xl">{video.title}</h3>
        <p className="text-sm">{video.description}</p>
        <div className="video-stats text-gray-300 mt-2">
          <p>{video.viewCount} views</p>
        </div>
      </div>

      {/* Play/Pause Indicator */}
      {!isVideoPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-white opacity-70"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  );
});

export default VideoCard;