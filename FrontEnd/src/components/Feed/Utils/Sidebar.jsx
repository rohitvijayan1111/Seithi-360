import React from "react";
import { useState,useEffect } from "react";
const categoryFeedUrls = {
  Sports: "https://rss.app/feeds/v1.1/SXgRLLL6qAQEQRJ6.json",
  Technology: "https://rss.app/feeds/v1.1/gxXiSULzzhoYx8XJ.json",  
  Politics: "https://rss.app/feeds/v1.1/JHRIb44ZGKHhLNDz.json",
  Business: "https://rss.app/feeds/v1.1/VAnnNyKqS5MgoLpF.json",
  Entertainment: "https://rss.app/feeds/v1.1/3SSCaYfwjpRPmiDZ.json",
};

const Sidebar = () => {
  const [summary, setSummary] = useState("Loading summary...");
  const [error, setError] = useState(null);
  const formatSummary = (text) => {
    return text
      .split("\n")
      .map((line, index) => {
        // Check if the line contains category names wrapped in **
        if (line.startsWith("**") && line.endsWith("**")) {
          return (
            <React.Fragment key={index}>
              <br />
              <strong>{line.replace(/\*\*/g, "")}</strong>
              <br />
            </React.Fragment>
          );
        }
        return (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        );
      });
  };

  useEffect(() => {
    const fetchAndSummarizeNews = async () => {
      try {
        const textBase = [];

        // Fetch news for all categories
        for (const category in categoryFeedUrls) {
          const response = await fetch(categoryFeedUrls[category]);
          const data = await response.json();

          const items = data.items.slice(0, 5); // Get top 5 news items
          const categorySummary = `${category} News:\n${items
            .map((item) => `${item.title}: ${item.content_text || "No description available"}`)
            .join("\n")}`;

          textBase.push(categorySummary);
        }

        // Combine all category summaries into a single string
        const fullTextBase = textBase.join("\n\n");

        // Send the combined text to backend for summarization
        const summaryResponse = await fetch("http://localhost:5000/summarize-news", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newsData: fullTextBase }),
        });

        if (!summaryResponse.ok) {
          throw new Error("Failed to get summary from backend");
        }

        const { summary } = await summaryResponse.json();
        setSummary(summary);
      } catch (error) {
        console.error("Error fetching or summarizing news:", error);
        setError("Failed to fetch or summarize news.");
      }
    };

    fetchAndSummarizeNews();
  }, []);
  return (
    <div className="space-y-6">
      {/* Top News Section */}
      {/* <div className="bg-white rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-bold mb-2">Top News</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>- Breaking news 1</li>
          <li>- Breaking news 2</li>
          <li>- Breaking news 3</li>
        </ul>
      </div> */}

      {/* Summary Section */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-bold mb-2">AI-Generated Summary</h3>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="text-sm text-gray-600">{formatSummary(summary)}</div>
        )}
      </div>

      {/* Puzzle Section */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-bold mb-2">Puzzle</h3>
        <p className="text-sm text-gray-600">Solve today's brain teaser!</p>
      </div>
    </div>
  );
};

export default Sidebar;
