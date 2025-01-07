import React, { useState, useEffect } from "react";
import { FaFootballBall, FaLaptopCode, FaLandmark, FaChartLine, FaFilm, FaNewspaper, FaCheckCircle } from "react-icons/fa";
import { parseString } from "xml2js";
import { Link } from "react-router-dom";
import axios from "axios";
const categories = [
  { name: "General", icon: <FaNewspaper /> },
  { name: "Sports", icon: <FaFootballBall /> },
  { name: "Technology", icon: <FaLaptopCode /> },
  { name: "Politics", icon: <FaLandmark /> },
  { name: "Business", icon: <FaChartLine /> },
  { name: "Entertainment", icon: <FaFilm /> },
];

const categoryFeedUrls = {
  General: "https://rss.app/feeds/D4WOO7MkrKgg1TwF.xml",
  Sports: "https://rss.app/feeds/SXgRLLL6qAQEQRJ6.xml",
  Technology: "https://rss.app/feeds/zciHKszsHyt8CgnE.xml",  
  Politics: "https://rss.app/feeds/JHRIb44ZGKHhLNDz.xml",
  Business: "https://rss.app/feeds/VAnnNyKqS5MgoLpF.xml",
  Entertainment: "https://rss.app/feeds/3SSCaYfwjpRPmiDZ.xml",
};

const MainNewsComponent = () => {
  const [activeCategory, setActiveCategory] = useState("Sports");
  const [feedData, setFeedData] = useState([]);
  const [articles, setArticles] = useState([]); // New state for articles
  const [loading, setLoading] = useState(false);
  const [views, setViews] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [inputData, setInputData] = useState({});
  const [activeShareViewIndex, setActiveShareViewIndex] = useState(null); 


  const fetchFeed = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(categoryFeedUrls[category]);
      const xmlText = await response.text();
      parseString(xmlText, { trim: true }, (err, result) => {
        if (err) {
          console.error("Error parsing RSS feed", err);
          setLoading(false);
          return;
        }
        const items = result.rss.channel[0].item || [];
        setFeedData(items);
        setLoading(false);
      });
    } catch (error) {
      console.error("Error fetching feed", error);
      setLoading(false);
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/news-articles`); // Replace with your API endpoint
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles", error);
    }
  };

  useEffect(() => {
    fetchFeed(activeCategory);
    fetchArticles(); // Fetch articles on component mount
  }, [activeCategory]);

  const handleInputChange = (index, type, value) => {
    setInputData((prevState) => ({
      ...prevState,
      [index]: {
        ...prevState[index],
        [type]: value,
      },
    }));
  };

  const handleShareView = async (index) => {
    const { currentView, currentHashtags } = inputData[index] || {};
    if (currentView && currentHashtags) {
      const updatedViews = { ...views };
      updatedViews[index] = {
        view: currentView,
        hashtags: currentHashtags,
        imageUrl: feedData[index]["media:content"]
          ? feedData[index]["media:content"][0].$.url
          : "",
        title: feedData[index].title[0],
        link: feedData[index].link[0],
      };
      setViews (updatedViews);

      try {
        const payload = {
          username: "user123",  // Replace with dynamic username if needed
          thoughts: currentView,
          hashtags: currentHashtags,
          image_url: feedData[index]["media:content"]
            ? feedData[index]["media:content"][0].$.url
            : "",
          title: feedData[index].title[0],
          link: feedData[index].link[0],
        };

        await axios.post(`${process.env.REACT_APP_BACKEND}/api/shareview`, payload); // Replace with your backend URL
        setAlertMessage("Your thoughts have been shared successfully!");
        setInputData((prevState) => ({
          ...prevState,
          [index]: {
            currentView: "",
            currentHashtags: "",
          },
        }));
      } catch (error) {
        setAlertMessage("Error submitting your thoughts. Please try again.");
        console.error("Error sending share view to backend", error);
      }
    }
  };

  const toggleShareViewVisibility = (index) => {
    setActiveShareViewIndex(activeShareViewIndex === index ? null : index);
  };

  const renderFeedContent = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="flex justify-center items-center col-span-3">
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : feedData.length > 0 ? (
          feedData.map((item, index) => {
            const imageUrl = item["media:content"]
              ? item["media:content"][0].$.url
              : item.description &&
                item.description[0].match(/<img[^>]+src="([^">]+)"/)
              ? item.description[0].match(/<img[^>]+src="([^">]+)"/)[1]
              : "";
            const pubDate = item.pubDate
              ? new Date(item.pubDate[0]).toLocaleDateString()
              : "No date available";

            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="News Image"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="font-semibold text-xl text-blue-600 mb-2 hover:text-blue-800 transition-colors duration-200">
                  {item.title && item.title[0] ? item.title[0] : "Untitled"}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{pubDate}</p>
                <a
                  href={item.link && item.link[0] ? item.link[0] : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 font-semibold"
                >
                  Read more
                </a>
                <button
                  onClick={() => toggleShareViewVisibility(index)}
                  className="mt-4 bg-blue-500 text-white mx-2 py-1 px-1 rounded-lg hover:bg-blue-700 text-sm"
                >
                  Share Your Thoughts
                </button>
                {activeShareViewIndex === index && (
                  <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
                    <textarea
                      value={inputData[index]?.currentView || ""}
                      onChange={(e) => handleInputChange(index, "currentView", e.target.value)}
                      placeholder="Write your thoughts..."
                      className="textarea-field bg-gray-100 border-2 p-2 rounded-md border-black-900 border-solid"
                    ></textarea>
                    <input
                      type="text"
                      value={inputData[index]?.currentHashtags || ""}
                      onChange={(e) => handleInputChange(index, "currentHashtags", e.target.value)}
                      placeholder="Add hashtags (e.g. #sports)"
                      className="input-field mt-2 bg-gray-100 border-2 p-2 rounded-md border-black-900 border-solid"
                    />
                    <button
                      onClick={() => handleShareView(index)}
                      className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                    >
                      Post
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-600">No {activeCategory} news available at the moment.</p>
        )}
      </div>
    );
  };

  const renderArticlesContent = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {articles.length > 0 ? (
          articles.map((article) => {
            // Construct the full URL for the image
            const imageUrl = article.image_path
              ? `${process.env.REACT_APP_BACKEND}${article.image_path}` // Use the correct URL
              : "";
  
            const pubDate = new Date(article.created_at).toLocaleDateString();
  
            return (
              <div key={article.id} className="bg-white p-6 rounded-lg shadow-lg">
                {imageUrl && (
                  <img
                    src={imageUrl} // Use the constructed URL
                    alt="Article Image"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="font-semibold text-xl text-blue-600 mb-2 hover:text-blue-800 transition-colors duration-200">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{pubDate}</p>
                <p className="text-gray-700 mb-4">{article.content}</p>
                <button
                  onClick={() => toggleShareViewVisibility(article.id)}
                  className="mt-4 bg-blue-500 text-white mx-2 py-1 px-1 rounded-lg hover:bg-blue-700 text-sm"
                >
                  Share Your Thoughts
                </button>
                <br></br>
                <Link
                  to={`/article/${article.id}`} // Navigate to the article details page
                  className="mt-4 bg-blue-500 text-white mx-2 py-1 px-1 rounded-lg hover:bg-blue-700 text-sm"
                >
                  Read More
                </Link>
                {activeShareViewIndex === article.id && (
                  <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
                    <textarea
                      value={inputData[article.id]?.currentView || ""}
                      onChange={(e) => handleInputChange(article.id, "currentView", e.target.value)}
                      placeholder="Write your thoughts..."
                      className="textarea-field bg-gray-100 border-2 p-2 rounded-md border-black-900 border-solid"
                    ></textarea>
                    <input
                      type="text"
                      value={inputData[article.id]?.currentHashtags || ""}
                      onChange={(e) => handleInputChange(article.id, "currentHashtags", e.target.value)}
                      placeholder="Add hashtags (e.g. #news)"
                      className="input-field mt-2 bg-gray-100 border-2 p-2 rounded-md border-black-900 border-solid"
                    />
                    <button
                      onClick={() => handleShareView(article.id)}
                      className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                    >
                      Post
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-600">No articles available at the moment.</p>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex gap-4 flex-wrap mb-8 justify-start md:justify-between">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setActiveCategory(category.name)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition ${
              activeCategory === category.name
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
            } hover:scale-105 transform`}
          >
            <span className="text-lg">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>
      <div className="mt-6 p-4 rounded-lg bg-gray-50">
        {renderFeedContent()}
        {renderArticlesContent()} {/* Render articles below the news feed */}
      </div>

      {/* Alert Message */}
      {alertMessage && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            alertMessage.includes("successfully")
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {alertMessage}
        </div>
      )}
    </div>
  );
};

export default MainNewsComponent;