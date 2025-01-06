import React, { useState } from "react";

const SideBarP = ({ setContent }) => {
  const [isOpen, setIsOpen] = useState(false); // State to handle sidebar toggle

  const handleContentChange = (section) => {
    setContent(section);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Sidebar Button (Visible only on mobile screens) */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed bottom-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded-full"
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 bg-white h-full border-r shadow-lg transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative lg:block lg:w-64`}
      >
        {/* <div className="flex items-center justify-center h-14 border-b">
          <div className="font-semibold text-lg">Personalization</div>
        </div> */}
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5">
              <div className="text-sm font-light text-gray-500">Menu</div>
            </li>
            <li>
              <button
                onClick={() => handleContentChange("my-interest")}
                className="w-full text-left flex items-center h-11 px-4 py-2 hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500"
              >
                <span className="mr-4">💬</span>
                <span className="text-sm">My Interest</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleContentChange("youtube-news")}
                className="w-full text-left flex items-center h-11 px-4 py-2 hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500"
              >
                <span className="mr-4">📺</span>
                <span className="text-sm">YouTube Feed</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleContentChange("top-10")}
                className="w-full text-left flex items-center h-11 px-4 py-2 hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500"
              >
                <span className="mr-4">📰</span>
                <span className="text-sm">Top 10 News</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleContentChange("worldnews")}
                className="w-full text-left flex items-center h-11 px-4 py-2 hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500"
              >
                <span className="mr-4">🌟</span>
                <span className="text-sm">World News</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleContentChange("others")}
                className="w-full text-left flex items-center h-11 px-4 py-2 hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500"
              >
                <span className="mr-4">🎯</span>
                <span className="text-sm">Areas and Districts</span>
              </button>
            </li>

            {/* New "My Interest" Section */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBarP;
