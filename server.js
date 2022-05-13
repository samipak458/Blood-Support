// Require Packages
const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

// PORT
const PORT = process.env.PORT || 8080;

// Express app config
const publicPath = path.join(__dirname, "public"); // Get the path of 'public' folder
app.use(express.static(publicPath)); // Use express default middleware to serve all HTML, CSS and JS files
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.status(200); // Respond '200' OK
});


// Server will listen to PORT 3000
app.listen(PORT, () => {
  console.log(`Server listening at PORT ${PORT}`);
});
