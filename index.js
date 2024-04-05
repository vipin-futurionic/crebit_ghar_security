const express = require("express");
const fs = require("fs");
const nocache = require("nocache");
const helmet = require("helmet");

const securityMiddleware = require("./middleware/securityMiddleware");
const mainController = require("./controllers/mainController");

const app = express();

// Use Helmet middleware for enhanced security
app.use(securityMiddleware.useHelmet());

// Enable HTTP Strict Transport Security (HSTS) to force the use of HTTPS
app.use(securityMiddleware.enableHSTS());

// Prevents browsers from trying to guess (incorrectly) the MIME type
// of a response, based on the content itself. By setting the X-Content-Type-Options
// header to nosniff, the browser will not guess the type and will instead
// follow the type specified in the Content-Type header.
app.use(helmet.noSniff());

// Prevents Internet Explorer from executing downloads in the context of a
// protected mode process. By setting the X-Download-Options header to noopen,
// the browser will instead open downloaded files in a new process.
// This helps prevent exploits that may affect the integrity of the current
// process, for example, a malicious PDF opened by the browser.
app.use(helmet.ieNoOpen());

// Middleware to add security headers
app.use(nocache());

// // Middleware to redirect HTTP to HTTPS
// app.use(securityMiddleware.redirectToHttps);

// Define routes
app.get("/", mainController.index);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
