// require the things that I will be using
const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');
const api = require('./routes/index.js');

// set up the port for heroku or 3001
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

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

