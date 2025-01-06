import React, { useState } from "react";
import SidebarP from "./utils/SideBarP";
import Example from "../Feed/Header/Header";

const Personalization = () => {
  const [content, setContent] = useState("welcome");
  
  const renderContent = () => {
    switch (content) {
      case "youtube-news":
        return (
          <div className="text-lg text-indigo-600">
            <h2 className="text-2xl font-bold mb-4">YouTube Feed</h2>
            <p>Stay updated with the latest trends on YouTube!</p>
          </div>
        );
      case "influencers":
        return (
          <div className="text-lg text-green-600">
            <h2 className="text-2xl font-bold mb-4">Influencers</h2>
            <p>Discover popular influencers and their stories!</p>
          </div>
        );
      case "top-10":
        return (
          <div className="text-lg text-red-600">
            <h2 className="text-2xl font-bold mb-4">Top 10 News</h2>
            <p>Explore the most trending topics right now!</p>
          </div>
        );
      case "others":
        return (
          <div className="text-lg text-yellow-600">
            <h2 className="text-2xl font-bold mb-4">Other Content</h2>
            <p>Check out more exciting topics and updates!</p>
          </div>
        );
      case "my-interest":
        // Retrieve the preferences from session storage
        const preferences =
          JSON.parse(sessionStorage.getItem("preference")) || [];

        return (
          <div className="text-lg text-purple-600">
            <h2 className="text-2xl font-bold mb-4">My Interest</h2>
            <div className="space-y-4">
              {preferences.length > 0 ? (
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Your Preferences
                  </h3>
                  <ul className="space-y-2">
                    {preferences.map((interest, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-700 py-2 px-4 rounded-lg border border-gray-200 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <span className="mr-2">🔹</span>
                        {interest}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-500">
                  No preferences set yet. Please add some preferences!
                </p>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="text-lg text-gray-600">
            <h2 className="text-2xl font-bold mb-4">Welcome</h2>
            <p>Select a category from the sidebar to explore.</p>
          </div>
        );
    }
  };

  return (
    <>
      <Example />
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 text-gray-800">
        {/* Sidebar */}
        <div className="lg:w-64 w-full lg:sticky lg:left-0 lg:top-0 lg:h-full lg:flex lg:flex-col bg-white shadow-md lg:block lg:mt-0 mt-4 z-50">
          <SidebarP setContent={setContent} />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-8 transition-all duration-300 lg:ml-65">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Personalization
          </h1>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Personalization;
