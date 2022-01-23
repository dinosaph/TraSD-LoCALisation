// loaders/Express.js

const express = require( "express" );
const routes = require("../routes");
const config = require("../config");
const logger = require("../services/logger")

class ExpressLoader {
    constructor () {
        const app = express();
        routes( app );
        this.server = app.listen( config.port, () => {
            logger.info('Express framework is running - Now listening on port ${config.port}');
        });
    }

    get Server () {
        return this.server;
    }
}

module.exports = ExpressLoader;