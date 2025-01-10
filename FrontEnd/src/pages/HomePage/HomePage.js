import React from "react";
import { NavBar, News } from "../../components";
import { Box, Typography } from "@mui/material";
import Footer from "../../components/Footer/Footer";

function HomePage() {
  return (
    <>
      <NavBar />

      <Box
        sx={{
          backgroundColor: "#f9f9ff",
          minHeight: "100vh",
          paddingTop: "80px", 
          paddingX: { xs: 2, sm: 4, md: 8 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <News />
        </Box>

        <Box
          component="footer"
          sx={{
            width: "100%",
            marginTop: "auto", 
          }}
        >
          <Footer />
        </Box>
      </Box>
    </>
  );
}

export default HomePage;
