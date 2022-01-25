// routes/index.js

const express = require('express');
let router = express.Router();

// Controllers modules
var scanner_controller = require('../controllers/Scanner');

const routes = app => {

  // HOME
  router.get('/', function ( req, res ) {
    res.sendFile(__dirname + '/pages/home.html');
  } );

  // SCANNER
  router.get('/scanner/index', scanner_controller.scannerservice_test);
  router.get('/scanner/web', scanner_controller.scannerservice_test);
  router.get('/scanner/video', scanner_controller.scannerservice_test);

  app.use(express.static(__dirname + '/pages'));
  app.use( "/", router );

};

module.exports = routes;