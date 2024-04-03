// middleware/securityMiddleware.js
const helmet = require("helmet");

// Define middleware functions
function useHelmet() {
  return helmet();
}

function enableHSTS() {
  return helmet.hsts({
    maxAge: 31536000, // 1 year in seconds
    includeSubDomains: true, // Optional: include subdomains
    preload: true, // Optional: submit to HSTS preload list
  });
}

function redirectToHttps(req, res, next) {
  if (req.secure) {
    // If request is already HTTPS, proceed as usual
    next();
  } else {
    // If request is HTTP, redirect to corresponding HTTPS URL
    res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
}

// Export middleware functions
module.exports = {
  useHelmet,
  enableHSTS,
  redirectToHttps,
};
