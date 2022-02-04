// app.js - Main
// import * as tf from '@tensorflow/tfjs';
// import {loadGraphModel} from '@tensorflow/tfjs-converter';

const logger = require("./services/logger")
const ExpressLoader = require("./loaders/Express");

logger.info("About to start Express...");
new ExpressLoader();