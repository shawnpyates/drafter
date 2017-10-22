const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config()

// const index = require('./server/routes/index');



const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

require('./server/routes')(app)

app.get('*', (req, res) => {
  res.status(200).send({ message: "Welcome to nothing!" })
})



module.exports = app;
