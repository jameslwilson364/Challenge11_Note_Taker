// require the things that I will be using
const express = require('express');
const path = require('path');
// const fs  = require('fs');
const noteData = require('./db/db.json');
const api = require('./routes/index.js');

// set up the port for heroku or 3001
// use app to invoke express
const PORT = 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// get route for the main page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// get route for the notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// localhost launch from terminal line
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

// WHEN I open the Note Taker
// THEN I am presented with a landing page with a link to a notes page
// WHEN I click on the link to the notes page
// THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
// WHEN I enter a new note title and the note’s text
// THEN a "Save Note" button and a "Clear Form" button appear in the navigation at the top of the page
// WHEN I click on the Save button
// THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes and the buttons in the navigation disappear
// WHEN I click on an existing note in the list in the left-hand column
// THEN that note appears in the right-hand column and a "New Note" button appears in the navigation
// WHEN I click on the "New Note" button in the navigation at the top of the page
// THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column and the button disappears