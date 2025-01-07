import React, { useState, useEffect } from "react";
import Example from "../Feed/Header/Header";
import Sidebar from "./utils/SidebarC";
import axios from "axios";

const fetchScrapedArticles = async (query) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND}/scrape3`, {
      params: { q: query || "Trending News" },
    });
    return response.data.articles || [];
  } catch (error) {
    console.error("Error fetching scraped articles:", error);
    return [];
  }
};

const formatArticles = (articles) =>
  articles.map((article) => ({
    title: article.title,
    description: article.source || "No description available",
    imageUrl: article.imgSrc || "https://via.placeholder.com/300x200",
    url: article.url,
  }));

const dummyCommunities = [
  {
    id: 1,
    name: "Dharmapuri",
    description:
      "A community for the people of Dharmapuri to connect and share.",
    posts: [
      "Local Festivals in Dharmapuri",
      "Best Places to Visit in Dharmapuri",
    ],
    members: 50,
  },
  {
    id: 2,
    name: "Thiruvanmiyur",
    description:
      "A community for Thiruvanmiyur residents to connect and share.",
    posts: ["Hidden Gems in Thiruvanmiyur", "Local Events in Thiruvanmiyur"],
    members: 75,
  },
  {
    id: 3,
    name: "Thiruvannamalai",
    description:
      "A community for those interested in Thiruvannamalai’s spiritual and cultural heritage.",
    posts: [
      "Pilgrimages in Thiruvannamalai",
      "Best Places to Visit in Thiruvannamalai",
    ],
    members: 100,
  },
  {
    id: 4,
    name: "Teynampet",
    description:
      "A community for the people of Teynampet to discuss local news and events.",
    posts: ["Upcoming Events in Teynampet", "Famous Eateries in Teynampet"],
    members: 65,
  },
  {
    id: 5,
    name: "Erode",
    description:
      "A community for Erode residents and those interested in Erode’s heritage.",
    posts: ["Erode’s Famous Handlooms", "Festivals and Traditions in Erode"],
    members: 90,
  },
];

const Community = () => {
  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  useEffect(() => {
    setCommunities(dummyCommunities);
  }, []);

  useEffect(() => {
    if (selectedCommunity) {
      const query = `${selectedCommunity.name} News`;
      setLoading(true);
      fetchScrapedArticles(query)
        .then((articles) => {
          setCommunityPosts(formatArticles(articles));
        })
        .finally(() => {
          setLoading(false); 
        });
    }
  }, [selectedCommunity]);

  const renderCommunityDetails = () => {
    if (!selectedCommunity) {
      return (
        <p className="text-gray-500">Select a community to view details</p>
      );
    }

    if (loading) {
      return (
        <div className="flex justify-center items-center h-48">
          <div className="w-12 h-12 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
        </div>
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
          {communityPosts.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {communityPosts.map((post, index) => (
                <li
                  key={index}
                  className="p-3 bg-gray-100 rounded-md shadow hover:bg-gray-200 transition"
                >
                  <a href={post.url} target="_blank" rel="noopener noreferrer">
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <p className="text-gray-600">{post.description}</p>
                    {post.imageUrl && (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="mt-2 rounded-md"
                      />
                    )}
                  </a>
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
          <Sidebar
            communities={communities}
            onSelectCommunity={setSelectedCommunity}
          />
        </div>

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
