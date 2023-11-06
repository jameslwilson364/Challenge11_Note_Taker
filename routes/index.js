// require statements
const express = require('express');
const notes = require('./notes.js');


const app = express();

// routes to notes.js file 
app.use('/notes', notes);


module.exports = app;