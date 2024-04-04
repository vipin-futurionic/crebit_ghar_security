const helmet = require("helmet");

// Define middleware functions
function useHelmet() {
  return helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js",
        ],
        styleSrc: ["'self'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'", "https://api.example.com"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
        formAction: ["'self'"],
        upgradeInsecureRequests: [],
      },
    },
  });
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

const addSecurityHeaders = (req, res, next) => {
  // Set Cache-Control header to 'no-store' for sensitive information
  res.setHeader("Cache-Control", "no-store");
  // Add Content-Security-Policy header to restrict resources
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  next();
};

// Export middleware functions
module.exports = {
  useHelmet,
  enableHSTS,
  redirectToHttps,
  addSecurityHeaders,
};
