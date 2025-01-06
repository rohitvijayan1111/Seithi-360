import React from "react";

const VideoCard = React.forwardRef(({ video }, ref) => {
  return (
    <div className="video-card bg-white shadow-lg rounded-lg w-full md:w-[80vw] lg:w-[60vw] xl:w-[50vw] h-[80vh] flex flex-col justify-center items-center relative overflow-hidden transition-all duration-500 ease-in-out">
      <video
        ref={ref} // Assign the ref directly to the video element
        src={video.videoUrl}
        controls
        autoPlay={false} // We will control autoplay manually with the observer
        loop
        className="video-player w-full h-full object-cover"
      />
      <div className="video-info absolute bottom-5 left-5 text-white">
        <h3 className="font-bold text-xl">{video.title}</h3>
        <p>{video.description}</p>
        <div className="video-stats text-gray-300 mt-2">
          <p>{video.views} views</p>
        </div>
      </div>
    </div>
  );
});

export default VideoCard;
