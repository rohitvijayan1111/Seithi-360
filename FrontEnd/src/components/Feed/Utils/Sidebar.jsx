import React from "react";

const Sidebar = () => {
  return (
    <div className="space-y-6">
      {/* Top News Section */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-bold mb-2">Top News</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>- Breaking news 1</li>
          <li>- Breaking news 2</li>
          <li>- Breaking news 3</li>
        </ul>
      </div>

      {/* Summary Section */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-bold mb-2">Summary</h3>
        <p className="text-sm text-gray-600">
          A brief summary of the latest news and updates.
        </p>
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
