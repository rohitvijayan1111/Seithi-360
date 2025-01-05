import React, { useEffect, useState } from "react";

const NewsSidebar = () => {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSources = async () => {
      const url =
        "https://newsapi.org/v2/top-headlines/sources?country=in&apiKey=5a669c445dc24c469ae68482d21c0212";

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === "ok" && data.sources.length > 0) {
          setSources(data.sources);
        } else {
          throw new Error("No sources available for India.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSources();
  }, []);

  if (loading) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-4">
        <p className="text-blue-600 font-medium">Loading sources...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-4">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <aside className="bg-white shadow-lg rounded-lg p-4 h-[calc(100vh-4rem)] overflow-auto">
      <h2 className="text-lg font-bold text-purple-600 mb-4">News Sources</h2>
      <div className="space-y-3">
        {sources.map((source) => (
          <a
            key={source.id}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-purple-50 hover:bg-purple-100 transition-colors rounded-lg p-3 shadow-sm hover:shadow-md"
          >
            <h3 className="text-sm font-semibold text-gray-800 truncate">
              {source.name}
            </h3>
            <p className="text-xs text-gray-500 truncate">
              {source.description || "No description available"}
            </p>
          </a>
        ))}
      </div>
    </aside>
  );
};

export default NewsSidebar;
