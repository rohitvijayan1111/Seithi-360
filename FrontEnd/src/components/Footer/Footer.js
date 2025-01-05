import React from "react";
import { Box, Typography, Grid, Link, Divider, Container } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5fa", // Light purple/white
        color: "#4a148c", // Subtle purple for text
        py: 6,
        mt: 4,
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and About Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ color: "#6a1b9a", mb: 2 }}
            >
              செய்தி360
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#616161", lineHeight: 1.6 }}
            >
              Personalized and customized news from verified local sources,
              crafted by the dedicated team at <strong>கணினி_X</strong>. Stay
              informed with stories that matter to you.
            </Typography>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ mb: 2, color: "#4a148c" }}
            >
              Quick Links
            </Typography>
            <Box>
              <Link
                href="/about"
                underline="hover"
                sx={{ color: "#6a1b9a", display: "block", mb: 1 }}
              >
                About Us
              </Link>
              <Link
                href="/privacy"
                underline="hover"
                sx={{ color: "#6a1b9a", display: "block", mb: 1 }}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                underline="hover"
                sx={{ color: "#6a1b9a", display: "block", mb: 1 }}
              >
                Terms & Conditions
              </Link>
              <Link
                href="/contact"
                underline="hover"
                sx={{ color: "#6a1b9a", display: "block" }}
              >
                Contact Us
              </Link>
            </Box>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ mb: 2, color: "#4a148c" }}
            >
              Stay Connected
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 1, color: "#616161", lineHeight: 1.6 }}
            >
              Email: like22050.it@rmkec.ac.in
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 1, color: "#616161", lineHeight: 1.6 }}
            >
              Email: rith22080.it@rmkec.ac.in
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 1, color: "#616161", lineHeight: 1.6 }}
            >
              Email: broh22012.it@rmkec.ac.in   
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 1, color: "#616161", lineHeight: 1.6 }}
            >
              Phone: +91 98765 43210
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#616161", lineHeight: 1.6, mb: 1 }}
            >
              Follow us on social media:
            </Typography>
            <Box>
              <Link
                href="https://facebook.com"
                target="_blank"
                sx={{ color: "#4a148c", mr: 2 }}
              >
                Facebook
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                sx={{ color: "#4a148c", mr: 2 }}
              >
                Twitter
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                sx={{ color: "#4a148c" }}
              >
                Instagram
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, borderColor: "#e0e0e0" }} />
        <Typography
          variant="body2"
          textAlign="center"
          sx={{ color: "#9e9e9e", fontSize: "0.9rem" }}
        >
          &copy; {new Date().getFullYear()} செய்தி360. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
