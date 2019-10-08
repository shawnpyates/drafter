const express = require('express');

const app = require('express')();

const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const socket = require('socket.io');

require('dotenv').config();

const server = app.listen(process.env.PORT, () => {
  console.log(`listening for requests on ${process.env.PORT}`);
});

const io = socket(server);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

require('./server/routes')(app, io);

app.get('*', (req, res) => {
  const params = Object.values(req.params).join('/');
  res.redirect(`/#${params}`);
});

module.exports = app;
