const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Facebook access token
const videoId = process.env.FACEBOOK_VIDEO_ID;
const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

// Route to fetch comments from the live video
app.get("/", async (req, res) => {
  try {
    const comments = await fetchComments();
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error.response.data.error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// Function to fetch comments from Facebook Live video
const fetchComments = async () => {
  try {
    return await axios.get(
      `https://graph.facebook.com/${videoId}/comments?access_token=${accessToken}`
    ).then((response) => {
      return response.data.data;
    });
  } catch (error) {
    throw error;
  }
};

module.exports = app;