import React, { useState } from "react";

const Header = ({ onCategoryChange, onSearchChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const categories = [
    "all",
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];
  const [activeCategory, setActiveCategory] = useState("all");

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
    onSearchChange(event.target.value); // Pass the search query to the parent component
  };

  return (
    <header className="bg-white shadow-md py-4">
      <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Category Buttons */}
        <div className="flex gap-4">
          {categories.map((category) => (
            <button
              key={category}
              className={`${
                activeCategory === category
                  ? "text-purple-600 font-bold"
                  : "text-gray-600"
              } font-medium hover:text-black`}
              onClick={() => handleCategoryClick(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search articles..."
          className="bg-gray-100 rounded-full px-4 py-2 outline-none text-sm w-64"
          value={searchInput}
          onChange={handleSearchChange} // Update search input state
        />
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full border"
            />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 text-gray-700 z-10">
              {/* User Info */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900">John Doe</h4>
                <p className="text-sm text-gray-500">johndoe@example.com</p>
                <p className="text-sm text-gray-500 mt-1">
                  Prefers: Technology, Science
                </p>
              </div>
              {/* Saved News Section */}
              <a
                href="/saved-news"
                className="block text-blue-500 hover:underline font-medium text-sm"
              >
                Saved News
              </a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
