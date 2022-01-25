// app.js - Main

const logger = require("./services/logger")
const ExpressLoader = require("./loaders/Express");

logger.info("About to start Express...");
new ExpressLoader();