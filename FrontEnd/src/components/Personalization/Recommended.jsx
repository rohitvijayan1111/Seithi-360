import React from 'react'

const Recommended = () => {
  const articles = [
    {
      title:
        "US-Approved Spot Bitcoin ETFs Could Surpass $50 Billion Crypto ETP Market",
      category: "Blockchain News",
      time: "4 hours ago",
    },
    {
      title: "Over 65% of Crypto-Related Tweets Were Positive in 2023",
      category: "Blockchain News",
      time: "4 hours ago",
    },
    {
      title:
        "STX Price Prediction: After 126% Price Jump in December, What’s in Store for 2024?",
      category: "Blockchain News",
      time: "4 hours ago",
    },
  ];

  return (
    <aside className="bg-white shadow-lg rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4">Recommended</h3>
      <ul className="space-y-4">
        {articles.map((article, index) => (
          <li key={index} className="flex gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
            <div>
              <p className="text-sm font-medium">{article.title}</p>
              <p className="text-xs text-gray-500">{`${article.category} • ${article.time}`}</p>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Recommended;

