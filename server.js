// Imports
require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const NewsAPI = require("newsapi");

// Constants
const PORT = 5000;

// Initializing code
const app = express();
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

// App settings
app.set("view engine", "pug");
app.set("views", "./views");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));

// Routes
app.get("/", async (req, res) => {
  let headlines = await newsapi.v2.topHeadlines({
    language: "en",
    country: "us",
    q: "",
  });
  console.log("Home route visited!!");
  res.render("index.pug", { articles: headlines.articles });
});

app.get("/data", (req, res) => {
  var data = {
    name: "tanay",
    college: "kc",
    year: "TY",
  };
  res.send(data);
});

// Connections
app.listen(PORT, () => {
  console.log("Server running on port :", PORT);
});
