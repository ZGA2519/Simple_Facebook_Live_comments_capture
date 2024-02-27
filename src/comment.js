const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Facebook access token
const accessToken = "YOUR_FACEBOOK_ACCESS_TOKEN";
const videoId = "YOUR_FACEBOOK_LIVE_VIDEO_ID";

// Route to fetch comments from the live video
app.get("/comments", async (req, res) => {
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
    const response = await axios.get(
      `https://graph.facebook.com/${videoId}/comments?access_token=${accessToken}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
