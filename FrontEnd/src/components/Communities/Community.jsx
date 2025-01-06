import React, { useState, useEffect } from "react";
import Example from "../Feed/Header/Header";
import Sidebar from "./utils/SidebarC";

const dummyCommunities = [
  {
    id: 1,
    name: "Tech Enthusiasts",
    description: "A community for discussing the latest in technology.",
    posts: ["The Future of AI", "Top Programming Languages in 2025"],
    members: 120,
  },
  {
    id: 2,
    name: "Fitness Freaks",
    description: "Share your fitness journey and tips with others.",
    posts: ["Best Post-Workout Meals", "Morning Yoga Routines"],
    members: 85,
  },
  {
    id: 3,
    name: "Travel Diaries",
    description: "Explore the world through the stories of fellow travelers.",
    posts: ["Top 10 Destinations for 2025", "How to Travel on a Budget"],
    members: 200,
  },
];

const Community = () => {
  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  useEffect(() => {
    setCommunities(dummyCommunities);
  }, []);

  const renderCommunityDetails = () => {
    if (!selectedCommunity) {
      return (
        <p className="text-gray-500">Select a community to view details</p>
      );
    }

    return (
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h1 className="text-3xl font-bold text-blue-600">
          {selectedCommunity.name}
        </h1>
        <p className="text-gray-700 mt-2">{selectedCommunity.description}</p>
        <p className="mt-4 text-gray-600">
          <strong>Members:</strong> {selectedCommunity.members}
        </p>
        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition">
          Join Community
        </button>
        <div className="mt-6">
          <h2 className="text-2xl font-bold border-b pb-2">Posts</h2>
          {selectedCommunity.posts.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {selectedCommunity.posts.map((post, index) => (
                <li
                  key={index}
                  className="p-3 bg-gray-100 rounded-md shadow hover:bg-gray-200 transition"
                >
                  {post}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">No posts available yet.</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
    <Example />
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 text-gray-800">
        <div className="lg:w-64 w-full lg:left-0 lg:top-0 lg:h-full lg:flex lg:flex-col bg-white mt-4 shadow-md lg:block lg:mt-0 z-50">
          {/* Sidebar */}
          <Sidebar
            communities={communities}
            onSelectCommunity={setSelectedCommunity}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-8 transition-all duration-300 lg:ml-65">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            {renderCommunityDetails()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Community;
