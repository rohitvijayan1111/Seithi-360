import React, { useState } from "react";
import Example from "../Feed/Header/Header";
import SidebarP from "./utils/SideBarP";


const Personalization = () => {
  const [content, setContent] = useState("youtube-news");

  const renderContent = () => {
    switch (content) {
      case "youtube-news":
        return (
          <div>
            YouTube News: Stay updated with the latest trends on YouTube!
          </div>
        );
      case "influencers":
        return (
          <div>
            Influencers: Discover popular influencers and their stories!
          </div>
        );
      case "top-10":
        return <div>Top 10: Explore the most trending topics right now!</div>;
      case "others":
        return (
          <div>Other Content: Check out more exciting topics and updates!</div>
        );
      default:
        return (
          <div>Welcome! Select a category from the sidebar to explore.</div>
        );
    }
  };

  return (
    <>
      <Example />
      <div className="flex min-h-screen bg-gray-100 text-gray-800">
        {/* Sidebar */}
        <div className="sm:w-64">
          <SidebarP setContent={setContent} />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Personalization
          </h1>
          <div className="p-6 bg-white shadow-md rounded-lg">
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Personalization;
