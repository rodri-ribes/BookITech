const express = require("express")
const morgan = require("morgan")
const routes = require("./routes/index")
require('dotenv').config();
const db = require('./database/db');
const { urlencoded } = require("express");
const server = express()

server.name = 'API'
server.use(express.json());
server.use(urlencoded({ extended: false }))
server.use(morgan('dev'));

server.use(express.json())

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
})

server.use(express.json());
server.use('/', routes);

server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});


module.exports = server
