// require things
const notes = require('express').Router();
const path = require('path');
const fs = require('fs');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  notes.post('/notes', (req, res) => {
    
    console.info(`${req.method} request received to submit feedback`);
    const { noteTitle, noteText } = req.body;
    
    // If all the required properties are present
    if (noteTitle && noteText) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        note_id: uuid(),
    };
    
    noteData.push(newNote);
    const noteDataString = JSON.stringify(reviews);
        
    fs.writeFile(`./db/db.json`, noteDataString, (err) =>
      err
      ? console.error(err)
      : console.log(
      `Review for ${newNote.title} has been written to JSON file`
      )
    );
  
      const response = {
        status: 'success',
        body: newFeedback,
      };
  
      res.json(response);
    } else {
      res.json('Error in posting feedback');
      }
    });

  // need a delete

  module.exports = notes;