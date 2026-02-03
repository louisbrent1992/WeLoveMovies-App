const serverless = require("serverless-http");
const app = require("../src/app");

// Export the serverless handler directly
module.exports.handler = serverless(app);
