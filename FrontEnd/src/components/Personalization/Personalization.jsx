import React, { useState,useEffect,useRef,useCallback} from "react";
import SidebarP from "./utils/SideBarP";
import Example from "../Feed/Header/Header";
import axios from "axios";

const TrendingNews = () => {
  const [trendingNews, setTrendingNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Use the existing fetchRSSTrendingNews from the parent component
  const fetchRSSTrendingNews = async () => {
    try {
      const response = await axios.get("https://rss.app/feeds/v1.1/H9FHJ29WZmxyL1jn.json");
      
      const formattedNews = response.data.items.map(item => ({
        title: item.title,
        description: item.content_text || "No description available",
        imageUrl: item.image || "https://via.placeholder.com/300x200",
        url: item.url,
        pubDate: item.date_published,
        channel: item.authors[0]?.name || "Polimer News"
      }));

      return formattedNews;
    } catch (error) {
      console.error("Error fetching RSS trending news:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadTrendingNews = async () => {
      try {
        setIsLoading(true);
        const news = await fetchRSSTrendingNews();
        setTrendingNews(news);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading trending news:", error);
        setIsLoading(false);
      }
    };

    loadTrendingNews();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4 mx-auto"></div>
          <p className="text-gray-600">Loading trending news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-lg text-red-600">
      <h2 className="text-2xl font-bold mb-4">Trending News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trendingNews.map((news, newsIndex) => (
          <div key={newsIndex} className="p-4">
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden transition-shadow duration-300">
              <img 
                src={news.imageUrl} 
                alt={news.title} 
                className="w-full h-48 object-cover" 
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {news.description}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <a 
                    href={news.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 hover:underline text-sm"
                  >
                    Read More
                  </a>
                  <span className="text-xs text-gray-500">
                    {new Date(news.pubDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Personalization = () => {
  const [content, setContent] = useState("welcome");
  const [loadedSections, setLoadedSections] = useState({});
  const [sectionData, setSectionData] = useState({});
  const observerRef = useRef(null);
  const [loadedTrendingSections, setLoadedTrendingSections] = useState({});
  const [trendingSectionData, setTrendingSectionData] = useState({});
  const [isTrendingNewsLoaded, setIsTrendingNewsLoaded] = useState(false);

  const fetchRSSTrendingNews = async () => {
    if (isTrendingNewsLoaded) return trendingSectionData;

    try {
      const response = await axios.get("https://rss.app/feeds/v1.1/H9FHJ29WZmxyL1jn.json");
      
      const formattedNews = response.data.items.map(item => ({
        title: item.title,
        description: item.content_text || "No description available",
        imageUrl: item.image || "https://via.placeholder.com/300x200",
        url: item.url,
        pubDate: item.date_published,
        channel: item.authors[0]?.name || "Polimer News"
      }));

      setTrendingSectionData(formattedNews);
      setIsTrendingNewsLoaded(true);
      return formattedNews;
    } catch (error) {
      console.error("Error fetching RSS trending news:", error);
      return [];
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    // Get the components of the date
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    // Return in DD-MM-YYYY HH:mm format
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };
  const formatYoutube = (articles) => 
    articles.map((video) => ({
      title: video.title,
        description: video.description || "No description available",
        imageUrl: video.thumbnail || "https://via.placeholder.com/300x200",
        url: video.url,
        channel: video.channelName,
        viewCount: video.viewCount,
        pubDate:formatDate(video.pubDate),
    }));

  // Fetch YouTube videos for specific sections
  const fetchYouTubeVideosForSection = async (section) => {
    try {
      const response = await axios.get("http://localhost:5000/youtube-videos", {
        params: { query: section }
      });
      const vid=response.data.videos;
      console.log(vid);
      return formatYoutube(vid);
    } catch (error) {
      console.error(`Error fetching YouTube videos for ${section}:`, error);
      return [];
    }
  };

  // Lazy load YouTube section data
  const loadYouTubeSectionData = useCallback(async (section) => {
    // Prevent re-fetching already loaded sections
    if (loadedTrendingSections[section]) return;

    try {
      const videos = await fetchYouTubeVideosForSection(section);

      setTrendingSectionData(prev => ({
        ...prev,
        [section]: videos
      }));

      setLoadedTrendingSections(prev => ({
        ...prev,
        [section]: true
      }));
    } catch (error) {
      console.error(`Error loading ${section} section:`, error);
    }
  }, [loadedTrendingSections]);

  // Intersection Observer for lazy loading YouTube sections
  useEffect(() => {
    // Only run when youtube-news is selected
    if (content !== "youtube-news") return;

    const youtubeSections = JSON.parse(sessionStorage.getItem("preference")) || ['Erode news']; 
    
    // Preload first two sections
    youtubeSections.slice(0, 2).forEach(section => {
      loadYouTubeSectionData(section);
    });

    // Setup Intersection Observer
    const createObserver = () => {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const section = entry.target.getAttribute('data-youtube-section');
              if (section && !loadedTrendingSections[section]) {
                loadYouTubeSectionData(section);
              }
            }
          });
        },
        { threshold: 0.1 }
      );
      return observerRef.current;
    };

    const observer = createObserver();

    // Observe section placeholders
    const placeholders = document.querySelectorAll('.youtube-section-placeholder');
    placeholders.forEach(placeholder => observer.observe(placeholder));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [content, loadYouTubeSectionData]);





  // Render YouTube News Sections
  const renderYouTubeSections = () => {
    const youtubeSections = JSON.parse(sessionStorage.getItem("preference")) || ['Erode news']; 

    // Filter sections to only include loaded data
    const loadedSections = youtubeSections.filter(
      section => loadedTrendingSections[section]
    );

    return (
      <div className="text-lg text-indigo-600">
        <h2 className="text-2xl font-bold mb-4">YouTube News</h2>
        <div className="space-y-4">
          {/* Render Trending News */}
          <TrendingNews />

          {/* Render YouTube Sections */}
          {youtubeSections.length > 0 ? (
            loadedSections.length > 0 ? (
              loadedSections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <h3 className="text-xl font-semibold mb-3">{section} Videos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {trendingSectionData[section].map((video, videoIndex) => (
                      <div key={videoIndex} className="p-4">
                        <div className="bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden transition-shadow duration-300">
                          <img 
                            src={video.imageUrl} 
                            alt={video.title} 
                            className="w-full h-48 object-cover" 
                          />
                          <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                              {video.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {video.description}
                            </p>
                            <div className="flex justify-between items-center mt-2">
                              <a 
                                href={video.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-blue-500 hover:underline text-sm"
                              >
                                Watch Video
                              </a>
                              <span className="text-xs text-gray-500">
                                {video.pubDate}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4 mx-auto"></div>
                  <p className="text-gray-600">Loading YouTube videos...</p>
                </div>
              </div>
            )
          ) : (
            <p className="text-gray-500">
              No YouTube sections available.
            </p>
          )}

          {/* Render placeholders for not-yet-loaded sections */}
          {youtubeSections.length > 0 && 
            youtubeSections
              .filter(section => !loadedTrendingSections[section])
              .map((section, index) => (
                <div 
                  key={index} 
                  className="youtube-section-placeholder" 
                  data-youtube-section={section}
                >
                  <div className="bg-gray-100 rounded-lg p-4 animate-pulse">
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[...Array(3)].map((_, cardIndex) => (
                        <div key={cardIndex} className="bg-gray-200 rounded-lg h-64"></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
          }
        </div>
      </div>
    );
  };

  // Fetch scraped articles for a specific interest
  const fetchScrapedArticles = async (query) => {
    try {
      const response = await axios.get("http://localhost:5000/scrape3", {
        params: { q: query || "Trending News" },
      });
      return response.data.articles || [];
    } catch (error) {
      console.error("Error fetching scraped articles:", error);
      return [];
    }
  };

  // Transform articles into required format
  const formatArticles = (articles) => 
    articles.map((article) => ({
      title: article.title,
      description: article.source || "No description available",
      imageUrl: article.imgSrc || "https://via.placeholder.com/300x200",
      url: article.url,
    }));

  // Lazy load section data
  const loadSectionData = useCallback(async (section) => {
    // Prevent re-fetching already loaded sections
    if (loadedSections[section]) return;

    try {
      const articles = await fetchScrapedArticles(`${section} News`);
      const formattedArticles = formatArticles(articles);

      setSectionData(prev => ({
        ...prev,
        [section]: formattedArticles
      }));

      setLoadedSections(prev => ({
        ...prev,
        [section]: true
      }));
    } catch (error) {
      console.error(`Error loading ${section} section:`, error);
    }
  }, [loadedSections]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const preferences = JSON.parse(sessionStorage.getItem("preference")) || [];
    
    // Preload first two sections
    preferences.slice(0, 2).forEach(section => {
      loadSectionData(section);
    });

    // Setup Intersection Observer
    const createObserver = () => {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const section = entry.target.getAttribute('data-section');
              if (section && !loadedSections[section]) {
                loadSectionData(section);
              }
            }
          });
        },
        { threshold: 0.1 }
      );
      return observerRef.current;
    };

    const observer = createObserver();

    // Observe section placeholders
    const placeholders = document.querySelectorAll('.section-placeholder');
    placeholders.forEach(placeholder => observer.observe(placeholder));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadSectionData]);

  const renderMyInterestContent = () => {
    const preferences = JSON.parse(sessionStorage.getItem("preference")) || [];
  
    // Filter preferences to only include sections with loaded data
    const loadedPreferences = preferences.filter(section => sectionData[section]);
  
    return (
      <div className="text-lg text-purple-600">
        <h2 className="text-2xl font-bold mb-4">My Interest</h2>
        <div className="space-y-4">
          {preferences.length > 0 ? (
            loadedPreferences.length > 0 ? (
              loadedPreferences.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <h3 className="text-xl font-semibold mb-3">{section}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sectionData[section].map((news, newsIndex) => (
                      <div key={newsIndex} className="p-4">
                        <div className="bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden transition-shadow duration-300">
                          <img 
                            src={news.imageUrl} 
                            alt={news.title} 
                            className="w-full h-48 object-cover" 
                          />
                          <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                              {news.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {news.description}
                            </p>
                            <a 
                              href={news.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-blue-500 hover:underline text-sm mt-2 block"
                            >
                              Read More
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4 mx-auto"></div>
                  <p className="text-gray-600">Loading your interests...</p>
                </div>
              </div>
            )
          ) : (
            <p className="text-gray-500">
              No preferences set yet. Please add some preferences!
            </p>
          )}
  
          {/* Render placeholders for not-yet-loaded sections */}
          {preferences.length > 0 && 
            preferences
              .filter(section => !sectionData[section])
              .map((section, index) => (
                <div 
                  key={index} 
                  className="section-placeholder" 
                  data-section={section}
                >
                  <div className="bg-gray-100 rounded-lg p-4 animate-pulse">
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[...Array(3)].map((_, cardIndex) => (
                        <div key={cardIndex} className="bg-gray-200 rounded-lg h-64"></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
          }
        </div>
      </div>
    );
  };


  const renderContent = () => {
    switch (content) {
      case "youtube-news":
        return renderYouTubeSections();
      case "influencers":
        return (
          <div className="text-lg text-green-600">
            <h2 className="text-2xl font-bold mb-4">Influencers</h2>
            <p>Discover popular influencers and their stories!</p>
          </div>
        );
      case "top-10":
        return (
          <div className="text-lg text-red-600">
            <h2 className="text-2xl font-bold mb-4">Top 10 News</h2>
            <p>Explore the most trending topics right now!</p>
          </div>
        );
      case "others":
        return (
          <div className="text-lg text-yellow-600">
            <h2 className="text-2xl font-bold mb-4">Other Content</h2>
            <p>Check out more exciting topics and updates!</p>
          </div>
        );
      case "my-interest":
        return renderMyInterestContent();
      default:
        return (
          <div className="text-lg text-gray-600">
            <h2 className="text-2xl font-bold mb-4">Welcome</h2>
            <p>Select a category from the sidebar to explore.</p>
          </div>
        );
    }
  };

  return (
    <>
      <Example />
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 text-gray-800">
        {/* Sidebar */}
        <div className="lg:w-64 w-full lg:sticky lg:left-0 lg:top-0 lg:h-full lg:flex lg:flex-col bg-white shadow-md lg:block lg:mt-0 mt-4 z-50">
          <SidebarP setContent={setContent} />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-8 transition-all duration-300 lg:ml-65">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Personalization
          </h1>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Personalization;
