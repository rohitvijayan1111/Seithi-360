import React, { useState, useEffect } from "react";
import axios from "axios";

const UserPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getUserPosts"); // Replace with your backend URL
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user posts", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-6 sm:p-8 lg:p-12">
      <h1 className="text-3xl font-semibold text-center mb-6">User's Reposts</h1>
      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg mb-6 max-w-2xl mx-auto" // Smaller max-width here
            >
              {/* User Info */}
              <div className="flex items-center mb-4">
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png" // Dummy profile image
                  alt="User Profile"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold">{post.username || "Anonymous User"}</h3>
                  <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>
                </div>
              </div>

              {/* User's Thoughts */}
              <div className="p-2 mb-4 ">
                <p className="text-lg text-gray-800 mb-4 font-semibold">{post.thoughts}</p>
              </div>

              {/* Article Information (enclosed in a thin border) */}
              <div className=" shadow-lg p-4 rounded-lg mb-4">
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

              {/* Hashtags */}
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
  );
};

export default UserPostsPage;
