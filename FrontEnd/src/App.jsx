// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get('http://localhost:5000/scrape3');
//         console.log(response.data.articles);
//         setArticles(response.data.articles || []);
//       } catch (err) {
//         setError('Failed to load articles.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArticles();
//   }, []);

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Scraped Articles</h1>
//       {loading && <p>Loading articles...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <div>
//         {articles.map((article, index) => (
//           <div
//             key={index}
//             dangerouslySetInnerHTML={{ __html: article.outerHTML }}
//             style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Simulate search to get the actual image URL
  const getImageUrl = async (url) => {
    try {
      const response = await axios.get(`http://localhost:5000/resolve-image-url?url=${url}`);
      return response.data.imageUrl; // Get the actual image URL after redirect
    } catch (error) {
      console.error('Error fetching the image URL:', error);
      return null;  
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/scrape3');
        const articlesData = response.data.articles;

        // Get the actual image URLs for each article
        const articlesWithImageUrls = await Promise.all(
          articlesData.map(async (article) => {
            const actualImageUrl = await getImageUrl(article.imageUrl);
            return { ...article, imageUrl: actualImageUrl };
          })
        );

        setArticles(articlesWithImageUrls);
      } catch (err) {
        setError('Failed to load articles.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);
  console.log(articles);
  return (
    <div style={{ padding: '20px' }}>
      <h1>Scraped Articles</h1>
      {loading && <p>Loading articles...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {articles.map((article, index) => (
          <div key={index} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px', borderRadius: '8px' }}>
            {/* Display Image with Lazy Loading */}
            {article.imageUrl && (
              <img
                src={article.imageUrl}
                alt={article.text}
                style={{ width: '100px', height: '100px', marginRight: '10px' }}
                loading="lazy" // Enable native lazy loading
              />
            )}

            {/* Article Title and Link */}
            <div>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontWeight: 'bold', fontSize: '16px', color: '#007BFF' }}
              >
                {article.text}
              </a>
            </div>

            {/* Display Source and Time */}
            <div style={{ color: '#555', fontSize: '14px', marginTop: '5px' }}>
              <span>{article.source}</span> | <span>{article.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;