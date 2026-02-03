const serverless = require("serverless-http");
const express = require("express");
const app = require("../src/app");

const wrapper = express();

// This allows the app to handle requests starting with /api (from the redirect) 
// and requests starting with the full Netlify function path.
wrapper.use("/api", app);
wrapper.use("/.netlify/functions/api", app);

module.exports.handler = serverless(wrapper);
