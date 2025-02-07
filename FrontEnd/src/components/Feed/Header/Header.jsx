import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { current } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect,useState } from "react";
import GoogleTranslate from "../../GoogleTranslate";
const user = {
  name: sessionStorage.getItem("name") || "Guest",
  email: sessionStorage.getItem("email") || "guest@example.com",
  imageUrl:
    "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg",
};

const navigation = [{name:"Home",href:"/home",current:false},{ name: "Your Arena", href: "/yourfeed", current: false },{name:"Communities",href:"/communities",current:false},{name:"Shorts",href:"/shorts",current:false},{name:"Upload", href:"/upload",current:false}];

const userNavigation = [
  { name: "Your Profile", href: "/user-profile", current: false },
  {
    name: "Sign out",
    href: "/seithi360",
    handleClick: () => {
      sessionStorage.clear(); // Clear session storage
    },
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

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
   
       const loadLocalNews = async () => {
    setShowResults(true);
    setLoading(true);

    try {
      const query = searchQuery ? `${searchQuery}` : "Trending News";
      const articles = await fetchScrapedArticles(query);

      const formattedArticles = articles.map((article) => ({
        title: article.title,
        description: article.source || "No description available",
        imageUrl: article.imgSrc || "https://via.placeholder.com/300x200",
        url: article.url,
      }));

      setSearchResults(formattedArticles);
    } catch (error) {
      console.error("Error loading news:", error);
    } finally {
      setLoading(false);
    }
  };
     
   
  const handleSearch = async (event) => {
    if (event.key === "Enter" || event.type === "click") {
      await loadLocalNews();
      try {
        await axios.post(`${process.env.REACT_APP_BACKEND}/update-search-history`, {
          userId:sessionStorage.getItem('userId'),
          searchQuery,
        });
        console.log("Search logged successfully");
      } catch (error) {
        console.error("Error logging search:", error);
      }
    }
   

  };

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-white shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="shrink-0">
                <img
                  alt="Your Company"
                  src="seithi360-logo-bg.png"
                  className="h-12 w-auto"
                />
              </div>

              <div className="hidden md:block ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-500 hover:bg-gray-200 hover:text-gray-900",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
                
              </div>
            </div>
 
            <div className="flex items-center space-x-6">
            <div className="relative w-full max-w-xs sm:max-w-sm md:w-64">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="w-full p-2 rounded-lg bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                🔍
              </button>
            </div>

              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="flex items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white">
                    <img
                      alt=""
                      src={user.imageUrl}
                      className="h-8 w-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <a
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {item.name}
                      </a>
                    </MenuItem>
                  ))}
                  <GoogleTranslate/>
                </MenuItems>
              </Menu>
            </div>

            <div className="-mr-2 flex md:hidden">
              <DisclosureButton className="group inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white">
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block w-6 h-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden w-6 h-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-500 hover:bg-gray-200 hover:text-gray-900",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
            <DisclosureButton
              as="a"
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              Personalized News
            </DisclosureButton>
          </div>

          <div className="border-t border-gray-200 pb-3 pt-4">
            <div className="flex items-center px-5">
              <img
                alt=""
                src={user.imageUrl}
                className="h-10 w-10 rounded-full"
              />
              <div className="ml-3">
                <div className="text-base font-medium text-gray-900">
                  {user.name}
                </div>
                <div className="text-sm font-medium text-gray-400">
                  {user.email}
                </div>
              </div>
              <button
                type="button"
                className="relative ml-auto shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white"
              >
                <BellIcon aria-hidden="true" className="w-6 h-6" />
              </button>
            </div>
            <div className="mt-3 space-y-1 px-2">
              {userNavigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
        {showResults && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] p-6 overflow-y-auto">
      <button
        onClick={() => {
          setShowResults(false);
          setLoading(false);
        }}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
      >
        ✖
      </button>
      <h2 className="text-lg font-bold mb-4 text-black">Search Results</h2>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {searchResults.length > 0 ? (
            searchResults.map((news, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-md hover:bg-gray-200 transition duration-200">
                <img
                  src={news.imageUrl}
                  alt={news.title}
                  className="w-full h-60 object-cover rounded-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/300x200";
                  }}
                />
                <h3 className="text-md font-semibold mt-2 text-black">{news.title}</h3>
                <p className="text-sm text-black line-clamp-2">
                  {news.description}
                </p>
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-500 hover:text-indigo-700 hover:underline text-sm mt-2 block"
                >
                  Read More
                </a>
              </div>
            ))
          ) : (
            <div className="text-center text-black">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  </div>
)}

    </div>
  );
}
