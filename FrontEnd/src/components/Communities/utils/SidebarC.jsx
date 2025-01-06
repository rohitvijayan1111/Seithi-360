import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Sidebar = ({ communities, onSelectCommunity }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Toggle button for mobile */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed bottom-4 left-4 z-50 bg-indigo-600 text-white p-3 rounded-full shadow-md hover:bg-indigo-700 transition-all"
      >
        <span className="text-2xl">☰</span>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 bg-white h-full border-r shadow-xl transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative lg:block lg:w-64`}
      >
        <div className="flex justify-between items-center mb-6 px-4 py-3 border-b">
          <div className="font-semibold text-lg text-gray-700">Communities</div>
          {/* Close Button for Mobile (optional) */}
          {/* <button
            onClick={toggleSidebar}
            className="lg:hidden text-gray-600"
          >
            <AiOutlineClose size={24} />
          </button> */}
        </div>

        <ul className="space-y-4 px-4">
          {communities.map((community) => (
            <li
              key={community.id}
              className="p-3 cursor-pointer hover:bg-indigo-100 hover:text-indigo-600 rounded-lg transition-colors flex items-center gap-3"
              onClick={() => {
                onSelectCommunity(community);
                setIsOpen(false); // Close sidebar on selection (for mobile)
              }}
            >
              <div className="bg-indigo-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold">
                {community.name[0]}
              </div>
              <span className="text-md font-medium">{community.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
