import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Container,
} from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const PersonalizedPage = () => {
  const [articlesByPreference, setArticlesByPreference] = useState({});
  const [regionalNews, setRegionalNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const preferences =
        JSON.parse(sessionStorage.getItem("preference")) || [];
      const districts = sessionStorage.getItem("district") || [];

      if (preferences.length === 0) {
        alert("No preferences found in session storage.");
        setLoading(false);
        return;
      }

      const articlesGroup = {};

      // Fetch articles for each preference separately
      for (const preference of preferences) {
        const response = await fetch(
          `http://localhost:5000/scrape3?q=${encodeURIComponent(preference)}`
        );
        if (!response.ok) {
          throw new Error(`Error fetching news for ${preference}`);
        }
        const data = await response.json();
        articlesGroup[preference] = data.articles || [];
      }
      setArticlesByPreference(articlesGroup);

      // Fetch local news for district
      if (districts.length > 0) {
        const districtQuery = districts;
        const regionalResponse = await fetch(
          `http://localhost:5000/scrape3?q=${encodeURIComponent(districtQuery)}`
        );
        if (regionalResponse.ok) {
          const regionalData = await regionalResponse.json();
          setRegionalNews(regionalData.articles || []);
        }
      }
    } catch (error) {
      console.error("Error fetching news:", error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          marginTop: 7,
        }}
      >
        <CssBaseline />

        {/* Left Sidebar */}
        <Box
          sx={{
            width: { xs: "100%", sm: 250 },
            backgroundColor: "#fff",
            color: "#6f42c1",
            display: "flex",
            flexDirection: "column",
            padding: "16px",
            position: { md: "sticky" },
            top: 0,
            maxHeight: "100vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Your Interests
          </Typography>
          <List>
            {JSON.parse(sessionStorage.getItem("preference") || "[]").map(
              (category, index) => (
                <ListItem button key={index}>
                  <ListItemText primary={category} />
                </ListItem>
              )
            )}
          </List>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            padding: { xs: "16px", md: "32px" },
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              marginBottom: 4,
              backgroundColor: "#fff", // A light background color to make it stand out
              padding: "12px", // Padding for better spacing around content
              borderRadius: 2, // Rounded corners for a modern look
              boxShadow: 2, // Subtle shadow to lift the content
              display: "flex", // Flexbox to align items properly
              alignItems: "center", // Vertically center the title
              justifyContent: "space-between", // Space between the title and any potential actions (e.g., settings)
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: "#6f42c1", // Purple color for the title
                fontWeight: "bold", // Bold font weight for emphasis
                letterSpacing: 1, // Slightly increase letter spacing for better readability
                // Capitalize first letter of each word
              }}
            >
              Personalized News for you
            </Typography>
          </Box>

          {loading ? (
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}
            >
              <CircularProgress />
            </Box>
          ) : Object.keys(articlesByPreference).length === 0 ? (
            <Typography sx={{ marginTop: 4 }} align="center">
              No news articles found.
            </Typography>
          ) : (
            Object.keys(articlesByPreference).map((preference) => (
              <Box key={preference} sx={{ marginTop: 4 }}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  {preference}
                </Typography>
                <Grid container spacing={3}>
                  {articlesByPreference[preference].map((article, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          boxShadow: 3,
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        {article.imgSrc && (
                          <CardMedia
                            component="img"
                            height="200"
                            image={article.imgSrc}
                            alt={article.title}
                          />
                        )}
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" gutterBottom>
                            {article.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {article.source} - {article.publishedAt}
                          </Typography>
                        </CardContent>
                        <Box sx={{ padding: "8px", textAlign: "center" }}>
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              textDecoration: "none",
                              color: "#6f42c1",
                              fontWeight: "bold",
                              fontSize: "16px",
                            }}
                          >
                            Read More
                          </a>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))
          )}
        </Box>

        {/* Right Sidebar */}
        <Box
          sx={{
            width: { xs: "100%", sm: 250 },
            backgroundColor: "#ecf0f1",
            padding: "16px",
            marginTop: { xs: 2, sm: 0 },
            maxHeight: "100vh",
            overflowY: "auto",
          }}
        >
          <Typography
            variant="h6"
            sx={{ marginBottom: 2 }}
            align="center"
            style={{ color: "#6f42c1" }}
          >
            Local News
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            style={{ fontWeight: "bold", marginBottom: "16px" }}
          >
            {sessionStorage.getItem("district") || "Unknown District"}
          </Typography>
          <Divider />
          <List>
            {regionalNews.slice(0, 7).map((news, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={news.title}
                  secondary={`${news.source} - ${news.publishedAt}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        </Box>
        
        
      

    </>
  );
};

export default PersonalizedPage;
