const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

const COMMENTS_FILE = path.join(__dirname, "comments.json");

app.use(express.json());
app.use(express.static("public")); // serve your html file from /public

// Load comments
app.get("/comments", (req, res) => {
  if (!fs.existsSync(COMMENTS_FILE)) {
    return res.json([]);
  }
  const data = fs.readFileSync(COMMENTS_FILE);
  res.json(JSON.parse(data));
});

// Save new comment
app.post("/comments", (req, res) => {
  let comments = [];
  if (fs.existsSync(COMMENTS_FILE)) {
    comments = JSON.parse(fs.readFileSync(COMMENTS_FILE));
  }
  comments.push(req.body);
  fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
