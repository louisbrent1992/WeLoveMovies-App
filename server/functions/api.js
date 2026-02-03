const serverless = require("serverless-http");
const express = require("express");
const app = require("../src/app");

const wrapperApp = express();

// We need to mount the app at the function path so that Express 
// routing works correctly with the Netlify function URL structure.
wrapperApp.use("/.netlify/functions/api", app);

module.exports.handler = serverless(wrapperApp);
