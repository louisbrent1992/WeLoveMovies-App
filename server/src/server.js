const app = require("./app");

const PORT = process.env.PORT || 5001;

const listener = app.listen(PORT, () => {
  console.log(`🎬 WeLoveMovies API Server`);
  console.log(`📡 Listening on port ${PORT}`);
  console.log(`🔗 http://localhost:${PORT}`);
  console.log(`✅ Connected to TMDB API`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  listener.close(() => {
    console.log("Process terminated");
  });
});
