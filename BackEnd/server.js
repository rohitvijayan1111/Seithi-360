const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const puppeteer = require('puppeteer');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pass123',
  database: 'kynhood',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

//no
// app.get('/scrape3', async (req, res) => {
//   try {
//     const url = 'https://news.google.com/search?q=Google earth images'; // URL to scrape
//     const browser = await puppeteer.launch({ headless: true }); // Launch Puppeteer in headless mode
//     const page = await browser.newPage();

//     // Go to the target URL
//     await page.goto(url, { waitUntil: 'networkidle2' });

//     // Scrape all <article> tags and their content
//     const elements = await page.evaluate(() => {
//       const articleElements = document.querySelectorAll('article'); // Get all <article> tags
//       return Array.from(articleElements).map((article) => ({
//         outerHTML: article.outerHTML, // Full HTML of each <article>
//       }));
//     });

//     await browser.close();

//     // Return the scraped articles as JSON
//     res.json({ articles: elements });
//   } catch (error) {
//     console.error('Error scraping:', error);
//     res.status(500).send('Error scraping the website.');
//   }
// });

app.get('/resolve-image-url', async (req, res) => {
  const { url } = req.query; // URL to be resolved
  console.log(url);
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Extract the final image URL by simulating a search
    const finalImageUrl = await page.evaluate(() => {
      const imgElement = document.querySelector('img'); // Assuming the first image needs to be fetched
      return imgElement ? imgElement.src : null;
    });

    await browser.close();
    
    if (finalImageUrl) {
      res.json({ imageUrl: finalImageUrl });
    } else {
      res.status(404).json({ error: 'Image not found' });
    }
  } catch (error) {
    console.error('Error resolving image URL:', error);
    res.status(500).send('Error resolving image URL');
  }
});

app.get('/scrape3', async (req, res) => {
  try {
    const url = 'https://news.google.com/search?q=Hackathon'; // URL to scrape
    const browser = await puppeteer.launch({ headless: true }); // Launch Puppeteer in headless mode
    const page = await browser.newPage();

    // Go to the target URL
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Scrape the required data
    const elements = await page.evaluate(() => {
      // Get all <article> elements
      const articleElements = document.querySelectorAll('article');
      const articles = Array.from(articleElements).map((article) => {
        // Fetch the image URL using class 'K0q4G'
        const imageElement = article.querySelector('.K0q4G img');
        const imageUrl = imageElement ? imageElement.src : null;

        // Fetch the text and hyperlink using class 'JtKRv'
        const linkElement = article.querySelector('.JtKRv');
        const link = linkElement ? linkElement.href : null;
        const text = linkElement ? linkElement.textContent : null;

        // Fetch the time using class 'hvbAAd'
        const timeElement = article.querySelector('.hvbAAd');
        const time = timeElement ? timeElement.textContent : null;

        // Fetch the source (e.g., "The Hindu") using classes '.a7P8l' and '.vr1PYe'
        const sourceElement = article.querySelector('.a7P8l .vr1PYe');
        const source = sourceElement ? sourceElement.textContent : null;

        return {
          text,
          link,
          imageUrl,
          time,
          source, // Add the source information
        };
      });

      return articles;
    });

    await browser.close();

    // Return the scraped articles as JSON
    res.json({ articles: elements.slice(0,5) });
  } catch (error) {
    console.error('Error scraping:', error);
    res.status(500).send('Error scraping the website.');
  }
});



app.get('/scrape', async (req, res) => {
  try {
    const url = 'https://tamil.news18.com/local-news/#'; // URL to scrape
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' }); // Wait for the page to load fully

    // Extract articles with title, image, and link
    const articles = await page.evaluate(() => {
      const articleElements = document.querySelectorAll('ul.jsx-61e08029d2de88db.newctgrtopstories li.jsx-61e08029d2de88db'); // Update selector based on HTML structure
      const articlesArray = [];

      articleElements.forEach(article => {
        // Extract title
        const titleElement = article.querySelector('a.jsx-61e08029d2de88db.tpa');
        const title = titleElement ? titleElement.innerText : '';

        // Extract image specifically from the current <li> context
        const imgElement = article.querySelector('figure img'); // This targets the <img> within the <figure> of the current <li>
        const image = imgElement ? imgElement.src : '';

        // Extract link
        const link = titleElement ? titleElement.href : '';

        // Add to articles array
        if (title && image && link) {
          articlesArray.push({ title, image, link });
        }
      });

      return articlesArray;
    });

    await browser.close();

    res.json(articles);
  } catch (error) {
    console.error('Error scraping:', error);
    res.status(500).send('Error scraping the website.');
  }
});


async function scrapeArticles(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Use a more generic selector to find potential article containers
  const articles = await page.evaluate(() => {
    const potentialContainers = document.querySelectorAll('ul, ol, div'); // Look for lists or divs
    const articlesArray = [];

    potentialContainers.forEach(container => {
      // Check if the container has child elements that look like articles
      const items = container.querySelectorAll('li, .catdetail'); // Look for list items or specific classes
      items.forEach(item => {
        const titleElement = item.querySelector('a'); // Look for an anchor tag for the title
        const title = titleElement ? titleElement.innerText : '';
        const link = titleElement ? titleElement.href : '';
        const imgElement = item.querySelector('img'); // Look for an image
        const image = imgElement ? imgElement.src : '';

        // Only add if we have a title, link, and image
        if (title && link && image) {
          articlesArray.push({ title, link, image });
        }
      });
    });

    return articlesArray;
  });

  await browser.close();
  return articles;
}

// Define the scrape endpoint
app.get('/scrape2', async (req, res) => {
  try {
    const url = 'https://news.google.com/search?q=Adyar&hl=en-IN&gl=IN&ceid=IN%3Aen'; // URL to scrape
    const articles = await scrapeArticles(url);
    res.json(articles);
  } catch (error) {
    console.error('Error scraping:', error);
    res.status(500).send('Error scraping the website.');
  }
});

// Routes
app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching data from database');
    } else {
      res.status(200).json(results);
    }
  });
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.query(query, [name, email], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error adding user to database');
    } else {
      res.status(201).json({ message: 'User added successfully', userId: results.insertId });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
