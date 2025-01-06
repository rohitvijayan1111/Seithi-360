import React, { useState } from 'react';
import axios from 'axios';

const NewsArticleForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [metaTags, setMetaTags] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('metaTags', metaTags);

    try {
      const imageResponse = await axios.post("http://localhost:5000/api/upload", formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      const imagePath = imageResponse.data.imagePath;

      await axios.post('http://localhost:5000/api/articles', { title, content, metaTags, imagePath });
      alert('Article posted successfully!');
    } catch (error) {
      console.error(error);
      alert('Error posting article.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Post a News Article</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              id="title"
              type="text"
              placeholder="Enter article title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 bg-white text-black-700 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              id="content"
              placeholder="Write your article here"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="mt-1 block bg-white text-black-700 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="metaTags" className="block text-sm font-medium text-gray-700">Meta Tags</label>
            <input
              id="metaTags"
              type="text"
              placeholder="Enter meta tags (comma separated)"
              value={metaTags}
              onChange={(e) => setMetaTags(e.target.value)}
              className="mt-1 bg-white text-black-700 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-100 file:hover:bg-gray-200"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white  py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Post Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsArticleForm;
