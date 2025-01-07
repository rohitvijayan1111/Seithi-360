import React,{useEffect,useState} from "react";
import QuizSection from "../../../pages/QuizSection";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHashtag, FaArrowUp } from "react-icons/fa";
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
  const [trendingHashtags, setTrendingHashtags] = useState([]);
  const navigate = useNavigate(); 
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
    const fetchTrendingHashtags = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/trending-hashtags`);
        const data = await response.json();
        setTrendingHashtags(data);
      } catch (error) {
        console.error("Error fetching trending hashtags:", error);
      }
    };

    fetchTrendingHashtags();
  }, []);

  const handleHashtagClick = (hashtag) => {
    navigate(`/post/${hashtag}`); // Navigate to the UserPostsPage with the clicked hashtag
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
        const summaryResponse = await fetch(`${process.env.REACT_APP_BACKEND}/summarize-news`, {
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
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <div className="space-y-6">

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-lg p-4 max-w-sm">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="mr-2">🔥</span> Trending Now
          </h3>
        <ul className="space-y-3">
        {trendingHashtags.length > 0 ? (
          trendingHashtags.map((hashtag, index) => (
            <li
              key={index}
              className="flex justify-between items-start -mx-7 p-2 hover:bg-gray-200 rounded-md cursor-pointer transition"
              onClick={() => handleHashtagClick(hashtag.hashtag)} // Add click event to navigate
            >
              <div className="flex items-center space-x-2">
                <FaHashtag className="text-blue-500 text-xl" />
                <div className="flex flex-col">
                  <span className="text-gray-800 font-semibold truncate">{hashtag.hashtag}</span>
                  <div className="flex items-center space-x-1">
                    <FaArrowUp className="text-green-500 text-sm" />
                    <span className="text-gray-500 text-sm">{hashtag.count} mentions</span>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="text-gray-500">Loading trending hashtags...</li>
        )}


</ul>
      </div>

 
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-bold mb-2">AI-Generated Summary</h3>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="text-sm text-gray-600">{formatSummary(summary)}</div>
        )}
      </div>

      
      <div
        className="bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:bg-gray-100"
        onClick={() => setIsQuizOpen(true)} // Open the quiz modal
      >
        <h2 className="text-lg font-bold mb-2">Puzzle Section</h2>
        <h3 className="text-lg font-bold mb-2">Quiz</h3>
        <p className="text-sm text-gray-600">Solve today's Quiz!</p>
      </div>

      {/* QuizSection Modal */}
      <QuizSection isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      
    </div>
  );
};

export default Sidebar;
