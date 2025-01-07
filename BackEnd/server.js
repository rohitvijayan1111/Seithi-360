const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const { google } = require("googleapis");
const axios = require("axios");
const app = express();
const PORT = 5000;
const bcrypt = require("bcryptjs");
const puppeteer = require("puppeteer");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const geminiApiKey = "AIzaSyAdFW-tfACDH3xlRiB2TFir0RZpm9-RxCc";
const googleAI = new GoogleGenerativeAI(geminiApiKey);
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};

const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-pro",
  geminiConfig,
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1207",
  database: "kynhood",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

function parseQuiz(rawQuiz) {
  const questions = [];
  const lines = rawQuiz.split("\n").filter((line) => line.trim() !== "");
  let currentQuestion = null;

  lines.forEach((line) => {
    line = line.trim();

    if (/^\d+\)/.test(line)) {
      // Match the question number format (e.g., "1)", "2)", etc.)
      // Save the previous question if any
      if (currentQuestion) {
        questions.push(currentQuestion);
      }
      // Start a new question
      currentQuestion = { question: "", options: [], correctOption: "" };
      currentQuestion.question = line.slice(line.indexOf(")") + 1).trim();
    } else if (/^\([a-d]\)/i.test(line)) {
      // Match the options (e.g., "(a)", "(b)", etc.)
      currentQuestion?.options.push(line);
    } else if (line.startsWith("Correct answer:")) {
      // Match the correct answer
      const correctOption = line.slice(line.indexOf(":") + 1).trim();
      if (currentQuestion) {
        currentQuestion.correctOption = correctOption;
      }
    }
  });

  // Add the last question to the array
  if (currentQuestion) {
    questions.push(currentQuestion);
  }

  return questions;
}

app.get("/api/trending-hashtags", (req, res) => {
  const query = `
    WITH split_hashtags AS (
      SELECT 
        id, 
        TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(hashtags, ' ', numbers.n), ' ', -1)) AS hashtag
      FROM 
        (SELECT 1 AS n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5) numbers
      JOIN 
        shareviews
      ON 
        CHAR_LENGTH(hashtags) - CHAR_LENGTH(REPLACE(hashtags, ' ', '')) + 1 >= numbers.n
    )
    SELECT 
      REPLACE(hashtag, '#', '') AS hashtag, 
      COUNT(*) AS count
    FROM 
      split_hashtags
    GROUP BY 
      hashtag
    ORDER BY 
      count DESC
    LIMIT 5; -- Top 5 trending hashtags
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching trending hashtags:", err);
      res.status(500).send("Database error");
      return;
    }
    res.json(results);
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use(express.json());

app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");
  res.status(200).json({ imagePath: `/uploads/${req.file.filename}` });
});

app.post('/api/articles', (req, res) => {
  const { title, content,district, metaTags, imagePath } = req.body;
  
  db.query(
    'INSERT INTO news_articles (title, content, meta_tags, image_path,district) VALUES (?, ?, ?, ?,?)',
    [title, content, metaTags, imagePath,district],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error inserting article");
      }
      res.status(201).json({ id: results.insertId, title, content, metaTags, imagePath,district });
    }
  );
});

app.get("/api/news-articles", async (req, res) => {
  try {
    const [articles] = await db
      .promise()
      .query("SELECT * FROM news_articles ORDER BY created_at DESC");
    res.json(articles);
  } catch (error) {
    console.error("Error fetching news articles", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/news-articles/:id", (req, res) => {
  const articleId = req.params.id;
  const query = "SELECT * FROM news_articles WHERE id = ?";

  db.query(query, [articleId], (err, results) => {
    if (err) {
      console.error("Error fetching article", err);
      return res.status(500).send("Error fetching article");
    }
    if (results.length === 0) {
      return res.status(404).send("Article not found");
    }
    res.json(results[0]);
  });
});

app.get("/api/news-articles/:district", (req, res) => {
  const district = req.params.district;
  const query = "SELECT * FROM news_articles WHERE district = ?";

  db.query(query, [district], (err, results) => {
    if (err) {
      console.error("Error fetching article", err);
      return res.status(500).send("Error fetching article");
    }
    if (results.length === 0) {
      return res.status(404).send("Article not found");
    }
    res.json(results[0]);
  });
});

app.get("/api/getPostsByHashtag/:hashtag", (req, res) => {
  const { hashtag } = req.params; // Extract the hashtag from the URL params

  // Query your database for posts containing the specified hashtag
  const query = `
    SELECT * 
    FROM shareviews 
    WHERE hashtags LIKE ? 
    ORDER BY created_at DESC;
  `;

  // Use parameterized queries to prevent SQL injection
  db.query(query, [`%${hashtag}%`], (err, results) => {
    if (err) {
      console.error("Error fetching posts by hashtag:", err);
      return res.status(500).send("Database error");
    }
    res.json(results); // Return the results as JSON
  });
});

app.post("/api/shareview", (req, res) => {
  const { username, thoughts, hashtags, image_url, title, link } = req.body;

  const query = `INSERT INTO ShareViews (username, thoughts, hashtags, image_url, title, link) VALUES (?, ?, ?, ?, ?, ?)`;

  db.execute(
    query,
    [username, thoughts, hashtags, image_url, title, link],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error saving share view" });
      }
      res.status(200).json({ message: "Share view saved successfully" });
    }
  );
});

app.get("/api/getUserPosts", async (req, res) => {
  try {
    const query = "SELECT * FROM ShareViews ORDER BY created_at DESC";
    const [results] = await db.promise().query(query); // Enable promises for this query
    res.json(results);
  } catch (error) {
    console.error("Error fetching posts", error);
    res.status(500).send("Error fetching posts");
  }
});



app.post('/generate-quiz', async (req, res) => {
  const { newsData } = req.body;

  if (!newsData || !Array.isArray(newsData) || newsData.length === 0) {
    return res.status(400).json({ error: 'News data is required and should be an array.' });
  }

  try {
    // Store all generated questions
    const quiz = [];

    // Loop through each news article to generate a question
    for (const article of newsData) {
      const dataString = JSON.stringify(article, null, 2);

      // Generate question for each news article
      const result = await geminiModel.generateContent(`
       Based on the following news, create one multiple-choice question with 4 options. Make sure the question is relevant to the news provided. Here is the news to analyze:

        Format the response as:
        1) According to the news, AI is primarily being used in healthcare for:
        (a) Administrative tasks
        (b) Diagnostics and treatment plans
        (c) Patient education
        (d) Drug discovery
        Correct answer: (b)
        
        the news need not to be in this context.

        Data to Analyze:
        ${dataString}
      `);

      console.log("Result received from Gemini API:", result);

      if (!result || !result.response || !result.response.text) {
        return res.status(500).json({ error: 'Unable to generate quiz for some news.' });
      }

      const rawQuiz = await result.response.text();
      console.log("Generated Quiz for this article:", rawQuiz);

      const formattedQuiz = parseQuiz(rawQuiz); // Call parseQuiz to format the raw quiz text
      quiz.push(formattedQuiz[0]); // Assuming each result is a single question
    }

    res.status(200).json({ quiz });
  } catch (error) {
    console.error('Error generating quiz:', error);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
});


// Function to fetch captions using Google APIs
async function getVideoCaptions(videoId) {
  try {
    const youtube = google.youtube({
      version: "v3",
      auth: API_KEY,
    });

    // Fetch captions
    const captionsResponse = await youtube.captions.list({
      part: "snippet",
      videoId: videoId,
    });

    const captions = captionsResponse.data.items;
    if (!captions || captions.length === 0) {
      throw new Error("No captions available for this video.");
    }

    // Select the first caption (assuming it's in a supported language)
    const captionId = captions[0].id;

    // Fetch caption text
    const captionDetails = await youtube.captions.download({
      id: captionId,
    });

    return captionDetails.data;
  } catch (error) {
    console.error("Error fetching captions:", error.message);
    return null;
  }
}

// Function to summarize text using Gemini API
async function summarizeTextWithGemini(text) {
  try {
    const response = await axios.post(GEMINI_API_URL, {
      apiKey: GEMINI_API_KEY,
      text: text,
    });

    return response.data.summary; // Assuming Gemini API returns a 'summary' field
  } catch (error) {
    console.error("Error summarizing text with Gemini API:", error.message);
    return null;
  }
}

// Extract video ID from YouTube URL
function getVideoId(url) {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

// Endpoint to handle video transcript and summarization
app.post("/api/getVideoSummary", async (req, res) => {
  const { videoUrl } = req.body;

  // Extract video ID from URL
  const videoId = getVideoId(videoUrl);
  if (!videoId) {
    return res.status(400).send({ error: "Invalid YouTube URL" });
  }

  // Step 1: Fetch captions
  let captionsText = await getVideoCaptions(videoId);
  if (!captionsText) {
    return res
      .status(500)
      .send({ error: "Could not fetch captions for the video" });
  }

  // Step 2: Summarize the captions using Gemini API
  const summary = await summarizeTextWithGemini(captionsText);
  if (!summary) {
    return res
      .status(500)
      .send({ error: "Could not generate summary using Gemini API" });
  }

  // Send the summarized result
  res.send({ summary });
});

app.post("/register", (req, res) => {
  const {
    name,
    email,
    password,
    mobile,
    preferredCategories,
    languagePreference,
    dateOfBirth,
    district,
    area,
  } = req.body;

  // Hash the password using bcrypt
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: "Error hashing password" });
    }

    // Prepare data to be inserted into the database
    const query = `
      INSERT INTO users (name, email, password, mobile, preferred_categories, language_preference, date_of_birth, district, area)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Convert the preferredCategories array into a JSON string for storing
    const categoriesJson = JSON.stringify(preferredCategories);

    // Execute the query to insert data into the users table
    db.query(
      query,
      [
        name,
        email,
        hashedPassword,
        mobile,
        categoriesJson,
        languagePreference,
        dateOfBirth,
        district,
        area,
      ],
      (err, result) => {
        if (err) {
          console.error("Error inserting data:", err);
          return res.status(500).json({ message: "Error registering user" });
        }

        // Respond with success message
        res.status(201).json({ message: "User registered successfully" });
      }
    );
  });
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validate if both email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Query to find the user by email
  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    // Check if the user with the given email exists
    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      // If passwords match, send a success response
      if (isMatch) {
        res.status(200).json({
          message: "Login successful",
          userId: user.id,
          preference: user.preferred_categories,
          languages: user.language_preference,
          district: user.district,
          name: user.name,
          email: user.email,
        });
      } else {
        res.status(400).json({ message: "Invalid email or password" });
      }
    });
  });
});

const getImageUrl = async (url) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}/resolve-image-url?url=${url}`
    );
    return response.data.imageUrl; // Get the actual image URL after redirect
  } catch (error) {
    console.error("Error fetching the image URL:", error);
    return null;
  }
};

app.get("/scrape3", async (req, res) => {
  try {
    console.log("testing 123");

    const searchQuery = req.query.q;
    if (!searchQuery) {
      return res.status(400).send("Search query is required.");
    }

    const url = `https://news.google.com/search?q=${encodeURIComponent(
      searchQuery
    )}`; // Construct the URL with the search query
    const browser = await puppeteer.launch({ headless: true }); // Launch Puppeteer in headless mode
    const page = await browser.newPage();

    // Go to the target URL
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

    // Scrape the required data
    const elements = await page.evaluate(() => {
      const articleElements = document.querySelectorAll("article");
      return Array.from(articleElements).map((article) => {
        const imageElement = article.querySelector(".K0q4G img");
        const imageUrl = imageElement ? imageElement.src : null;

        const linkElement = article.querySelector(".JtKRv");
        const link = linkElement ? linkElement.href : null;
        const text = linkElement ? linkElement.textContent : null;

        const timeElement = article.querySelector(".hvbAAd");
        const time = timeElement ? timeElement.textContent : null;

        const sourceElement = article.querySelector(".a7P8l .vr1PYe");
        const source = sourceElement ? sourceElement.textContent : null;

        return {
          title: text,
          url: link,
          imgSrc: imageUrl, // Processed later
          publishedAt: time,
          source,
        };
      });
    });

    await browser.close();

    // Resolve image URLs
    const articlesWithImages = await Promise.all(
      elements.slice(0, 5).map(async (article) => ({
        ...article,
        imgSrc: article.imgSrc ? await getImageUrl(article.imgSrc) : null,
      }))
    );

    // Return the scraped articles as JSON
    res.json({ articles: articlesWithImages });
    console.log(articlesWithImages);
  } catch (error) {
    console.error("Error scraping:", error);
    res.status(500).send("Error scraping the website.");
  }
});

app.get("/resolve-image-url", async (req, res) => {
  const { url } = req.query;
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const finalImageUrl = await page.evaluate(() => {
      const imgElement = document.querySelector("img"); // Assuming the first image needs to be fetched
      return imgElement ? imgElement.src : null;
    });

    await browser.close();

    if (finalImageUrl) {
      res.json({ imageUrl: finalImageUrl });
    } else {
      res.status(404).json({ error: "Image not found" });
    }
  } catch (error) {
    console.error("Error resolving image URL:", error);
    res.status(500).send("Error resolving image URL");
  }
});

app.get("/quiz", async (req, res) => {
  try {
    // Simulated JSON feed (replace with your API fetch if needed)
    const jsonFeed = {
      version: "1.0",
      title: "Tamil Nadu News Feed",
      items: [
        {
          id: "1",
          url: "https://example.com/news/1",
          title: "Tamil Nadu announces new industrial policy",
          content_text:
            "The Tamil Nadu government has introduced a new industrial policy aimed at boosting investments.",
          date_published: "2025-01-04T10:00:00Z",
          authors: [{ name: "Author A" }],
        },
        {
          id: "2",
          url: "https://example.com/news/2",
          title: "Cyclone warning issued for coastal districts",
          content_text:
            "A cyclone warning has been issued for several coastal districts in Tamil Nadu, including Chennai and Nagapattinam.",
          date_published: "2025-01-04T08:30:00Z",
          authors: [{ name: "Author B" }],
        },
      ],
    };

    // Generate quiz questions from items
    const quizQuestions = jsonFeed.items.map((item) => {
      // Create question based on the article title
      const question = `What is the main highlight of this article: "${item.title}"?`;

      // Generate plausible options (these can be more sophisticated based on NLP)
      const options = [
        `About ${item.content_text.slice(0, 20)}...`,
        `Not related to ${item.title.slice(0, 15)}...`,
        "Unrelated statement 1",
        "Unrelated statement 2",
      ];

      // Correct answer is the first option
      const correctAnswer = options[0];

      // Shuffle options (optional for better UX)
      const shuffledOptions = options.sort(() => Math.random() - 0.5);

      return {
        question,
        options: shuffledOptions,
        answer: correctAnswer,
        url: item.url, // Include article URL for reference
      };
    });

    // Respond with quiz questions
    res.json({ questions: quizQuestions });
  } catch (error) {
    console.error("Error generating quiz:", error.message);
    res.status(500).json({ error: "Failed to generate quiz questions." });
  }
});

app.get("/scrapeforMail", async (req, res) => {
  const browser = await puppeteer.launch({ headless: true });
  try {
    const userId = req.query.userId;
    if (!userId) return res.status(400).send("User ID is required.");

    // Query to fetch user preferences
    const query = "SELECT * FROM users WHERE id = ?";
    db.query(query, [userId], async (err, results) => {
      if (err) {
        console.error("Error querying database:", err);
        await browser.close();
        return res.status(500).send("Internal server error.");
      }

      if (results.length === 0) {
        await browser.close();
        return res.status(404).send("User not found.");
      }

      const user = results[0];
      const { preferred_categories, district } = user;
      const categories = JSON.parse(preferred_categories);
      const searchQuery =
        categories[Math.floor(Math.random() * categories.length)] +
        " " +
        district;

      console.log("Search Query:", searchQuery);

      try {
        const url = `https://news.google.com/search?q=${encodeURIComponent(
          searchQuery
        )}`;
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle2" });

        // Scrape the required data
        const elements = await page.evaluate(() => {
          const articleElements = document.querySelectorAll("article");
          return Array.from(articleElements)
            .map((article) => {
              const imageElement = article.querySelector(".K0q4G img");
              const imageUrl = imageElement ? imageElement.src : null;

              const linkElement = article.querySelector(".JtKRv");
              const link = linkElement ? linkElement.href : null;
              const text = linkElement ? linkElement.textContent : null;

              const timeElement = article.querySelector(".hvbAAd");
              const time = timeElement ? timeElement.textContent : null;

              const sourceElement = article.querySelector(".a7P8l .vr1PYe");
              const source = sourceElement ? sourceElement.textContent : null;

              return {
                title: text,
                url: link,
                imgSrc: imageUrl,
                publishedAt: time,
                source,
              };
            })
            .filter((article) => article.title && article.url); // Filter valid articles
        });

        // Limit to the first 5 articles
        const articlesWithImages = await Promise.all(
          elements.slice(0, 2).map(async (article) => ({
            ...article,
            imgSrc: article.imgSrc ? await getImageUrl(article.imgSrc) : null,
          }))
        );

        // Return the scraped articles as JSON
        res.json({ articles: articlesWithImages });
        console.log("Scraped Articles:", articlesWithImages);
      } catch (scrapingError) {
        console.error("Error during scraping:", scrapingError);
        res.status(500).send("Error scraping the website.");
      } finally {
        await browser.close(); // Ensure browser is closed after scraping
      }
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).send("Unexpected server error.");
  }
});

// Fetch Latest News Article
async function fetchNewsArticles(userId) {
  const API_URL = `${process.env.REACT_APP_BACKEND}/scrapeforMail?userId=${userId}`;
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch news articles: ${response.statusText}`);
    }
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error("Error fetching articles:", error.message);
    return [];
  }
}

// Generate Email Template
function generateEmailTemplate(articles) {
  const defaultImage = "https://via.placeholder.com/600x300";
  const newsletterHeader = `
      <div class="header">
          <h1>Today's Top Stories</h1>
          <p>Your curated news from கணினி_X' செய்தி360</p>
      </div>
  `;

  const articleTemplates = articles
    .map((article) => {
      const articleTitle = article.title || "No Title Available";
      const articleImage = article.imgSrc || defaultImage;
      const articleContent = article.publishedAt
        ? article.publishedAt
        : "Published date unavailable.";
      const articleUrl = article.url || "#";

      return `
      <div class="article-container">
          <h2 class="article-title">${articleTitle}</h2>
          <img src="${articleImage}" alt="Article Image" class="article-image">
          <p class="article-content">Published on: ${articleContent}</p>
          <a href="${articleUrl}" class="read-more">Read Full Article</a>
      </div>`;
    })
    .join(""); // Combine all article templates into a single string

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Daily News Update</title>
  <style>
      body {
          margin: 0;
          padding: 0;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          background-color: #f9f9f9;
          line-height: 1.6;
          color: #333333;
      }
      .email-container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }
      .header {
          background: linear-gradient(90deg, #6a11cb, #2575fc);
          color: #ffffff;
          padding: 30px 20px;
          text-align: center;
      }
      .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
          letter-spacing: 0.5px;
      }
      .header p {
          margin: 5px 0 0;
          font-size: 16px;
          opacity: 0.9;
      }
      .article-container {
          padding: 20px;
          border-bottom: 1px solid #eeeeee;
      }
      .article-title {
          font-size: 22px;
          margin-bottom: 15px;
          font-weight: 600;
          color: #2c3e50;
      }
      .article-image {
          width: 100%;
          max-height: 300px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 15px;
      }
      .article-content {
          font-size: 16px;
          color: #666666;
          margin-bottom: 20px;
          line-height: 1.8;
      }
      .read-more {
          display: block;
  width: fit-content;
  margin: 0 auto;
  background: #ffffff; /* White background */
  color: #333333; /* Dark gray text for good contrast */
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  border: 2px solid #e0e0e0; /* Light gray border for subtle definition */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
  transition: all 0.3s ease;
      }
      a{
          text-decoration: none;
          color:#ffffff;
      }
      .read-more:hover {
          background: linear-gradient(90deg, #2575fc, #6a11cb);
      }
      .footer {
          background-color: #f9f9f9;
          text-align: center;
          padding: 20px;
          font-size: 14px;
          color: #888888;
          border-top: 1px solid #eeeeee;
      }
      .footer a {
          color: #6a11cb;
          text-decoration: none;
      }
      .footer a:hover {
          text-decoration: underline;
      }
  </style>
</head>
<body>
  <div class="email-container">
      <!-- Header Section -->
      ${newsletterHeader}
      
      <!-- Articles Section -->
      ${articleTemplates}
      
      <!-- Footer Section -->
      <div class="footer">
          <p>You're receiving this email because you subscribed to our கணினி_X newsletter.</p>
          <p><a href="{{UNSUBSCRIBE_URL}}">Unsubscribe</a> | <a href="{{SETTINGS_URL}}">Manage Preferences</a></p>
      </div>
  </div>
</body>
</html>`;
}

// Send Email
async function sendEmail(recipient, subject, htmlContent) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rohitvijayandrive@gmail.com",
      pass: "kfzxznsmouxvszel",
    },
  });

  const mailOptions = {
    from: 'கணினி_X\' "செய்தி360" <like22050.it@rmkec.ac.in>',
    to: "rithikraja28.rr@gmail.com",
    subject: subject,
    html: htmlContent,
  };
  console.log(mailOptions);
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    // Log additional error details
    if (error.response) {
      console.error("Error response:", error.response);
    }
  }
}

app.post("/summarize-news", async (req, res) => {
  const { newsData } = req.body;

  if (!newsData) {
    return res.status(400).json({ error: "News data is required." });
  }

  try {
    const result = await geminiModel.generateContent(`
      Summarize the following news data into a concise paragraph for each category. Focus on the key highlights for each category.

      Data to Analyze:
      ${newsData}
    `);

    console.log("Result received from Gemini API:", result);

    if (!result || !result.response || !result.response.text) {
      return res.status(500).json({ error: "Unable to generate summary." });
    }

    const summary = await result.response.text();
    res.status(200).json({ summary });
  } catch (error) {
    console.error("Error generating summary:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
});

// Main Workflow
cron.schedule("*/30 * * * *", async () => {
  console.log("Running Cron Job - Sending Daily News Email");

  try {
    const latestArticles = await fetchNewsArticles(1);
    const emailContent = generateEmailTemplate(latestArticles);
    //console.log(emailContent);
    await sendEmail(
      "rithikraja28.rr@gmail.com",
      "Your Daily News Update",
      emailContent
    );
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error in cron job workflow:", error);
  }
});

const fetchYouTubeVideos = async (query) => {
  //const apiKey = 'AIzaSyC6ZbKJcjjJXv6l73-5Ij-rSS4oOQ_jn0s'; // Replace with your API key
  const apiKey = "AIzaSyBKDEl_EH5J98Z5HEYTPfruJ6JsEe56H-c";
  const baseUrl = "https://www.googleapis.com/youtube/v3/search";
  try {
    const response = await axios.get(baseUrl, {
      params: {
        part: "snippet",
        q: query,
        type: "video",
        maxResults: 10,
        key: apiKey,
      },
    });
    console.log(response.data.items);

    return response.data.items.map((item) => {
      const thumbnails = item.snippet.thumbnails;
      const thumbnailUrl =
        thumbnails.high?.url ||
        thumbnails.medium?.url ||
        thumbnails.default?.url; // Fallback logic

      return {
        title: item.snippet.title,
        description: item.snippet.description,
        videoId: item.id.videoId,
        url: "https://www.youtube.com/watch?v=" + item.id.videoId,
        thumbnail: thumbnailUrl, // Set the URL based on available resolution
        pubDate: item.snippet.publishTime,
      };
    });
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
};

app.get("/youtube-videos", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const videos = await fetchYouTubeVideos(query);
    res.status(200).json({ success: true, videos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/update-search-history", async (req, res) => {
  const { userId, searchQuery } = req.body;

  if (!userId || !searchQuery) {
    return res.status(400).send("Invalid input");
  }

  try {
    // Fetch the current search history for the user
    db.query(
      "SELECT search_history FROM users WHERE id = ?",
      [userId],
      (err, results) => {
        if (err) {
          console.error("Error fetching user data:", err);
          return res.status(500).send("Error fetching user data");
        }

        if (!results.length) {
          return res.status(404).send("User not found");
        }

        let searchHistory = {};
        
        // Safely parse search history
        try {
          // Log the raw search history for debugging
          console.log("Raw search history:", results[0].search_history);
          console.log("Type of search history:", typeof results[0].search_history);

          // Check if search_history exists and is not null
          if (results[0].search_history) {
            // Handle different possible input types
            const historyData = results[0].search_history;
            
            // If it's already an object, use it directly
            if (typeof historyData === 'object') {
              searchHistory = historyData;
            } 
            // If it's a string, try to parse it
            else if (typeof historyData === 'string') {
              // Remove any leading/trailing whitespace
              const trimmedHistory = historyData.trim();
              
              // Only parse if not an empty string
              if (trimmedHistory) {
                searchHistory = JSON.parse(trimmedHistory);
              }
            }
          }
        } catch (parseErr) {
          console.error("Error parsing search history:", parseErr);
          // If parsing fails, start with an empty object
          searchHistory = {};
        }

        // Ensure searchHistory is an object
        if (typeof searchHistory !== 'object' || searchHistory === null) {
          searchHistory = {};
        }

        // Update search history
        searchHistory[searchQuery] = (searchHistory[searchQuery] || 0) + 1;

        // Limit search history to last 10 entries
        const limitedSearchHistory = Object.fromEntries(
          Object.entries(searchHistory)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
        );

        // Stringify the search history
        const searchHistoryString = JSON.stringify(limitedSearchHistory);

        // Update the database
        db.query(
          "UPDATE users SET search_history = ? WHERE id = ?",
          [searchHistoryString, userId],
          (updateErr) => {
            if (updateErr) {
              console.error("Error updating search history:", updateErr);
              return res.status(500).send("Error updating search history");
            }

            res.status(200).json({
              message: "Search history updated successfully",
              searchHistory: limitedSearchHistory
            });
          }
        );
      }
    );
  } catch (error) {
    console.error("Error updating search history:", error);
    res.status(500).send("Internal server error");
  }
});

app.get("/top-searches/:userId", (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).send("User  ID is required");
  }

  try {
    // Fetch the user's search history from the database
    db.query(
      "SELECT search_history FROM users WHERE id = ?",
      [userId],
      (err, results) => {
        if (err) {
          console.error("Error fetching user data:", err);
          return res.status(500).send("Error fetching user data");
        }

        if (!results.length) {
          return res.status(404).send("User  not found");
        }

        let searchHistory = {};

        // Safely parse search history
        try {
          // Log the raw search history for debugging
          console.log("Raw search history:", results[0].search_history);
          console.log("Type of search history:", typeof results[0].search_history);

          // Check if search_history exists and is not null
          if (results[0].search_history) {
            const historyData = results[0].search_history;

            // If it's already an object, use it directly
            if (typeof historyData === 'object') {
              searchHistory = historyData;
            } 
            // If it's a string, try to parse it
            else if (typeof historyData === 'string') {
              const trimmedHistory = historyData.trim();
              
              // Only parse if not an empty string
              if (trimmedHistory) {
                searchHistory = JSON.parse(trimmedHistory);
              }
            }
          }
        } catch (parseErr) {
          console.error("Error parsing search history:", parseErr);
          return res.status(500).send("Corrupted search history data");
        }

        // Ensure searchHistory is an object
        if (typeof searchHistory !== 'object' || searchHistory === null) {
          searchHistory = {};
        }

        // Convert searchHistory object to an array of [query, count] pairs
        const searchEntries = Object.entries(searchHistory);

        // Sort entries by count in descending order
        searchEntries.sort((a, b) => b[1] - a[1]);

        // Take the top 3 entries
        const topSearches = searchEntries.slice(0, 3);

        res.status(200).json({ topSearches });
      }
    );
  } catch (error) {
    console.error("Error retrieving top searches:", error);
    res.status(500).send("Internal server error");
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
