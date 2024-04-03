function index(req, res) {
  res.send("Hello, world!");
}

// Export controller function
module.exports = {
  index,
};
