import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams to access URL params
import axios from "axios";
import Example from "../components/Feed/Header/Header"; // Header component
import Sidebar from "../components/Feed/Utils/Sidebar"; // Sidebar component

const UserPostsPage = () => {
  const { hashtag } = useParams(); // Get the hashtag from the URL
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/getPostsByHashtag/${hashtag}`); // Fetch posts by hashtag
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts for hashtag", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [hashtag]); // Fetch posts whenever the hashtag changes

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      {/* Header Section */}
      <Example />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4">
        {/* Grid Layout: Main News and Sidebar */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Main News Component (Left) */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 sm:p-8 lg:p-12">
              <h1 className="text-3xl font-semibold text-center mb-6">Trending Posts related to  #{hashtag}</h1>
              <div className="space-y-6">
                {posts.length > 0 ? (
                  posts.map((post, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-lg mb-6 max-w-2xl mx-auto">
                      <div className="flex items-center mb-4">
                        <img
                          src="https://www.w3schools.com/howto/img_avatar.png"
                          alt="User Profile"
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <h3 className="text-xl font-semibold">{post.username || "Anonymous User"}</h3>
                          <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="p-2 mb-4">
                        <p className="text-lg text-gray-800 mb-4 font-semibold">{post.thoughts}</p>
                      </div>
                      <div className="shadow-lg p-4 rounded-lg mb-4">
                        {post.image_url && (
                          <img
                            src={post.image_url}
                            alt="News Image"
                            className="w-full h-64 object-cover rounded-lg mb-4"
                          />
                        )}
                        <div>
                          <h4 className="text-xl font-semibold text-blue-600 mb-2">{post.title}</h4>
                          <a
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700 font-semibold"
                          >
                            Read the full article
                          </a>
                        </div>
                      </div>
                      {post.hashtags && (
                        <div className="text-sm text-blue-500 mt-2">
                          {post.hashtags.split(",").map((hashtag, i) => (
                            <span key={i} className="mr-2">{hashtag.trim()}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-600">No posts available.</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar (Right) */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          {/* Responsive Sidebar Toggle */}
          <div className="block lg:hidden">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="fixed bottom-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg focus:outline-none"
            >
              ☰
            </button>
            {isSidebarOpen && (
              <div className="fixed top-0 right-0 w-64 h-full bg-gray-800 text-white z-50 p-4 shadow-lg overflow-y-auto">
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="mb-4 text-white text-lg font-bold"
                >
                  ✖ Close
                </button>
                <Sidebar />
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-8 text-center">
        <p>&copy; 2025 NewsFeed. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UserPostsPage;
