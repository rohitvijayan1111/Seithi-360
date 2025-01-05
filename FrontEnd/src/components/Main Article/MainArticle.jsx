import React, { useState, useEffect } from "react";

const NewsFeed = ({ category, searchQuery }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchArticles = async (pageNumber = 1, query = "") => {
    setLoading(true);
    setError(null); // Reset error on each new request

    const today = new Date().toISOString().split("T")[0];
    const categoryQuery = category === "all" ? " " : `&category=${category}`;
    const searchQueryParam = query
      ? `&q=${encodeURIComponent(query)}`
      : "&q=India News";

    try {
      // Try fetching from the main API
      const response = await fetch(
        `https://newsapi.org/v2/everything?apiKey=5a669c445dc24c469ae68482d21c0212&language=en&page=${pageNumber}${categoryQuery}${searchQueryParam}&from=${today}&to=${today}&sortBy=popularity`
      );

      if (response.status === 429) {
        // If rate limit exceeded, fallback to the secondary API
        console.warn("Rate limit exceeded. Switching to backup API.");

        const backupResponse = await fetch(
          `https://saurav.tech/NewsAPI/top-headlines/category/${category}/in.json?date=${today}`
        );
        const backupData = await backupResponse.json();

        if (backupData.articles) {
          setArticles((prev) => [...prev, ...backupData.articles]);
        } else {
          setArticles([]);
          setError("No articles found in backup API.");
        }
        return;
      }

      // If the response is successful, parse the JSON data
      const data = await response.json();

      // Check if data.articles is an array before attempting to map it
      if (Array.isArray(data.articles)) {
        setArticles((prev) => [...prev, ...data.articles]);
      } else {
        console.error(
          "API response does not contain an array of articles:",
          data
        );
        setArticles([]);
        setError("No articles found.");
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setArticles([]);
      setError("Failed to fetch articles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reset articles and fetch for new category or search query
    setArticles([]);
    setPage(1);
    fetchArticles(1, searchQuery);
  }, [category, searchQuery]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchArticles(nextPage, searchQuery);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Show error message if there's an error */}
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-md mb-4">
          {error}
        </div>
      )}

      {/* Render articles */}
      {articles.length > 0
        ? articles.map((article, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 mb-4 border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {article.title}
              </h2>
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <p className="text-sm text-gray-600">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-purple-600 font-medium hover:underline"
              >
                Read Full Article →
              </a>
            </div>
          ))
        : !loading && (
            <p className="text-center text-gray-500 mt-4">No articles found.</p>
          )}

      {/* Loading state */}
      {loading ? (
        <p className="text-center text-gray-500 mt-4">Loading...</p>
      ) : (
        articles.length > 0 && (
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-600 mt-4 mx-auto block"
          >
            Load More
          </button>
        )
      )}
    </div>
  );
};

export default NewsFeed;
