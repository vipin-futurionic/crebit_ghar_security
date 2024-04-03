const express = require("express");
const helmetMiddleware = require("./middleware/securityMiddleware");
const mainController = require("./controllers/mainController");

const app = express();

// Use Helmet middleware for enhanced security
app.use(helmetMiddleware.useHelmet());

// Enable HSTS
app.use(helmetMiddleware.enableHSTS());

// Define routes
app.get("/", mainController.index);

// Start the server and listen on a specified port
const port = 2000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
