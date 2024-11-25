const jsonServer = require("json-server");
const path = require("path");
const express = require("express");
const multer = require("multer");

const app = express();
const router = jsonServer.router("db.json");

app.use(express.static(path.join(__dirname, "public"))); // Serve static files from public directory
app.use(jsonServer.defaults());

// Set up multer for handling image uploads
const upload = multer({ dest: "public/images/" });

app.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.json({ filename: req.file.filename });
});

// Use json-server router
app.use("/api", router);

app.listen(9000, () => {
  console.log("JSON Server is running on http://localhost:9000");
});
