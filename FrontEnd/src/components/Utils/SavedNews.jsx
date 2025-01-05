import React from "react";

const SavedNews = () => {
  const savedArticles = [
    {
      id: 1,
      title: "Breaking News: AI Revolutionizing Industries",
      description: "Discover how AI is changing the world in unexpected ways.",
    },
    {
      id: 2,
      title: "Top 10 Travel Destinations in 2024",
      description: "Explore the must-visit places around the globe this year.",
    },
    {
      id: 3,
      title: "The Future of Renewable Energy",
      description: "How sustainable energy is reshaping the planet.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Saved News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h2 className="text-lg font-semibold text-gray-700">
              {article.title}
            </h2>
            <p className="text-sm text-gray-500 mt-2">{article.description}</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600">
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedNews;
