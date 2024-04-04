const express = require("express");
const fs = require("fs");
const nocache = require("nocache");

const securityMiddleware = require("./middleware/securityMiddleware");
const mainController = require("./controllers/mainController");

const app = express();

// Use Helmet middleware for enhanced security
app.use(securityMiddleware.useHelmet());

// Enable HTTP Strict Transport Security (HSTS) to force the use of HTTPS
app.use(securityMiddleware.enableHSTS());

// Middleware to add security headers
app.use(nocache());

// // Middleware to redirect HTTP to HTTPS
// app.use(securityMiddleware.redirectToHttps);

// Define routes
app.get("/", mainController.index);

const port = 2000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
