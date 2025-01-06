import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Example from "../components/Feed/Header/Header";
import Sidebar from "../components/Feed/Utils/Sidebar";

const FullArticle = () => {
  const { id } = useParams(); // Get the article ID from the URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/news-articles/${id}`);
        setArticle(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching article", error);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!article) {
    return <div className="flex justify-center items-center h-screen">Article not found</div>;
  }

  const imageUrl = article.image_path ? `http://localhost:5000${article.image_path}` : "";
  const pubDate = new Date(article.created_at).toLocaleDateString();

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      {/* Header */}
      <Example />

      {/* Main Content with Sidebar */}
      <div className="flex max-w-7xl mx-auto p-4">
        {/* Main Article Section */}
        <main className="w-full lg:w-3/4 pr-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Article Header */}
            <div className="flex items-center mb-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                alt="Author Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="ml-3">
                <h2 className="text-lg font-semibold text-gray-800">{article.title}</h2>
                <p className="text-sm text-gray-500">{pubDate}</p>
              </div>
            </div>

            {/* Article Image */}
            {imageUrl && (
              <div className="w-full h-60 bg-gray-200 rounded-lg overflow-hidden mb-4">
                <img
                  src={imageUrl}
                  alt="Article"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article Content */}
            <div>
              <p className="text-gray-700 text-base leading-relaxed">{article.content}</p>
            </div>

            {/* Hashtags */}
            {article.meta_tags && (
              <div className="mt-4">
                {article.meta_tags.split(" ").map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-100 text-blue-600 text-sm font-medium mr-2 mb-2 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Like and Share Buttons */}
            <div className="mt-4 flex justify-between items-center border-t pt-4">
              <button className="text-blue-500 font-semibold hover:text-blue-700 flex items-center space-x-1">
                <span>👍</span>
                <span>Like</span>
              </button>
              <button className="text-blue-500 font-semibold hover:text-blue-700 flex items-center space-x-1">
                <span>🔗</span>
                <span>Share</span>
              </button>
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="hidden lg:block w-1/4">
          <Sidebar />
        </aside>

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
      </div>
    </div>
  );
};

export default FullArticle;
