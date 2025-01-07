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
// Add this new component at the top of your file or in a separate file
const Top10News = () => {
  const [topNews, setTopNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTop10News = async () => {
      try {
        const response = await fetch(
          "https://rss.app/feeds/v1.1/TVSFBCwYGkbvlq8d.json"
        );
        const data = await response.json();
        const items = data.items.map((item) => ({
          title: item.title,
          description: item.content_text || "No description available",
          imageUrl: item.image || "https://via.placeholder.com/300x200",
          url: item.url,
          pubDate: item.date_published
        }));
        setTopNews(items);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch news:", error);
        setLoading(false);
      }
    };

    fetchTop10News();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4 mx-auto"></div>
          <p className="text-gray-600">Loading Top 10 News...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-lg text-red-600">
      <h2 className="text-2xl font-bold mb-4">Top 10 News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topNews.map((news, newsIndex) => (
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


const Worldnews = () => {
  const [topNews, setTopNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTop10News = async () => {
      try {
        const response = await fetch(
          "https://rss.app/feeds/v1.1/yzTEoaJ4BR08AUsb.json"
        );
        const data = await response.json();
        const items = data.items.map((item) => ({
          title: item.title,
          description: item.content_text || "No description available",
          imageUrl: item.image || "https://via.placeholder.com/300x200",
          url: item.url,
          pubDate: item.date_published,
        }));
        setTopNews(items);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch news:", error);
        setLoading(false);
      }
    };

    fetchTop10News();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4 mx-auto"></div>
          <p className="text-gray-600">Loading World News...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-lg text-red-600">
      <h2 className="text-2xl font-bold mb-4">World News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topNews.map((news, newsIndex) => (
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


const SkeletonLoader = () => {
  return (
    <div className="p-4">
      <div className="bg-gray-200 rounded-lg shadow-md h-48 animate-pulse"></div>
      <div className="p-4">
        <div className="bg-gray-200 h-6 rounded mb-2 animate-pulse"></div>
        <div className="bg-gray-200 h-4 rounded mb-2 animate-pulse"></div>
        <div className="bg-gray-200 h-4 rounded mb-2 animate-pulse"></div>
      </div>
    </div>
  );
};
const ArticleCard = ({ article }) => (
  <div className="p-4">
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden transition-shadow duration-300">
      <img 
        src={article.imageUrl} 
        alt={article.title} 
        className="w-full h-48 object-cover" 
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {article.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {article.description}
        </p>
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-500 hover:underline text-sm mt-2 block"
        >
          Read More
        </a>
      </div>
    </div>
  </div>
);
const OthersContent = () => {
  const [districts, setDistricts] = useState([
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kanchipuram",
    "Kanyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivagangai",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thoothukudi (Tuticorin)",
    "Tiruchirappalli (Trichy)",
    "Tirunelveli",
    "Tirupattur",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar",
  ]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [areaArticles, setAreaArticles] = useState([]);
  const [districtNews, setDistrictNews] = useState([]);
  const [areaLoading, setAreaLoading] = useState(false);
  const [districtLoading, setDistrictLoading] = useState(false);
  const [article, setArticle] = useState(null); 
  const [error, setError] = useState(null);

  const formatArticles = (articles) => 
    articles.map((article) => ({
      title: article.title,
      description: article.source || "No description available",
      imageUrl: article.imgSrc || "https://via.placeholder.com/300x200",
      url: article.url,
    }));

  const fetchAreaArticles = async () => {
    try {
      setAreaLoading(true);
      const area = sessionStorage.getItem("areaNews") || "Thiruvanmiyur News";
      const response = await axios.get(`${process.env.REACT_APP_BACKEND}/scrape3`, {
        params: { q: area },
      });
      const articles = formatArticles(response.data.articles || []);
      setAreaArticles(articles);
      setAreaLoading(false);
    } catch (error) {
      console.error("Error fetching area articles:", error);
      setAreaLoading(false);
      setAreaArticles([]);
    }
  };

  const fetchDistrictArticles = async (district) => {
    try {
      setDistrictLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_BACKEND}/scrape3`, {
        params: { q: district },
      });
      const articles = formatArticles(response.data.articles || []);
      setDistrictNews(articles);
      setDistrictLoading(false);
    } catch (error) {
      console.error("Error fetching district articles:", error);
      setDistrictLoading(false);
      setDistrictNews([]);
    }
  };

  useEffect(() => {
    fetchAreaArticles();
  }, []);

  const handleDistrictChange = (event) => {
    const district = event.target.value;
    setSelectedDistrict(district);
    if (district) {
      fetchDistrictArticles(district);
    } else {
      setDistrictNews([]);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm) {
      fetchDistrictArticles(searchTerm);
    }
  };
  const district = sessionStorage.getItem("district");
  console.log(district);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        
        const response = await fetch(`/api/news-articles/${district}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchArticle();
  }, [district]);

  return (
    <div className="text-lg text-yellow-600">
      <h2 className="text-2xl font-bold mb-4">What's Happening in Your Area?</h2>
      
      {/* <div className="mb-6">
  <h3 className="text-xl font-semibold mb-2">Trending News from Journalist</h3>
  <p className="text-sm text-gray-600 mb-4">
    Stay updated with the latest happenings shared by local residents.
  </p>
4
  {areaLoading ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(3)].map((_, index) => (
        <SkeletonLoader key={index} />
      ))}
    </div>
  ) : Array.isArray(article) && article.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {article.map((article, index) => (
        <div
          key={index}
          className="border border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <img
            src={article.image_path}
            alt={article.title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h4 className="text-lg font-bold mb-2">{article.title}</h4>
          <p className="text-sm text-gray-600 mb-2">{article.meta_tags}</p>
          <p className="text-sm mb-4 line-clamp-3">{article.content}</p>
          <p className="text-sm text-gray-500">
            <strong>District:</strong> {article.district}
          </p>
          <p className="text-sm text-gray-500">
            <strong>Created At:</strong>{" "}
            {new Date(article.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  ) : (
    <p>No articles available.</p>
  )}
</div> */}


      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">News from Local People</h3>
        <p className="text-sm text-gray-600 mb-4">
          Stay updated with the latest happenings shared by local residents.
        </p>
        
        {areaLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
              <SkeletonLoader key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {areaArticles.map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="district" className="block mb-2 font-semibold">Select District:</label>
        <select
          id="district"
          value={selectedDistrict}
          onChange={handleDistrictChange}
          className="border border-gray-300 rounded p-2 w-full"
        >
          <option value="">Select a district</option>
          {districts.map((district, index) => (
            <option key={index} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="search" className="block mb-2 font-semibold">Search for Happenings:</label>
        <div className="flex items-center">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by location or keyword"
              className="border border-gray-300 rounded-l p-2 w-full pl-4 pr-10 text-sm"
            />
            <button
                onClick={handleSearchSubmit}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                🔍
              </button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">
          {selectedDistrict ? `${selectedDistrict} News` : 'Search Results'}
        </h3>
        
        {districtLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
              <SkeletonLoader key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {districtNews. length > 0 ? (
              districtNews.map((article, index) => (
                <ArticleCard key={index} article={article} />
              ))
            ) : (
              <p>No articles found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


const Personalization = () => {
  const [content, setContent] = useState("welcome ");
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
      const response = await axios.get(`${process.env.REACT_APP_BACKEND}/youtube-videos`, {
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
      const response = await axios.get(`${process.env.REACT_APP_BACKEND}/scrape3`, {
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
      case "worldnews":
        return <Worldnews/>
      case "top-10":
        return <Top10News />
      case "others":
        return <OthersContent/>
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
          {/* <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Personalization
          </h1> */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Personalization;
