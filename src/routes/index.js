// routes/routes.js

const express = require('express');
let router = express.Router();

const routes = app => {

  router.get('/', function ( req, res ) {
    res.sendFile(__dirname + '/pages/home.html');
  } );

  router.get('/scanner', function ( req, res ) {
    res.sendFile(__dirname + '/pages/scanner.html');
  } );

  app.use( "/", router );

};

module.exports = routes;