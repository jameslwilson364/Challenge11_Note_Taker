// require things
const notes = require('express').Router();
const path = require('path');
const fs = require('fs');
const {readFromFile} = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');


notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  notes.post('/', (req, res) => {
  
    console.info(`${req.method} request received to submit feedback`);
    const newNote = req.body;
    console.log(newNote);
    const noteData = require('../db/db.json');
    // If all the required properties are present
    if (newNote.title && newNote.text) {
      // Variable for the object we will save
      const newNoteSS = {
        title: newNote.title,
        text: newNote.text,
        id: uuid(),
    };
    
    
    noteData.push(newNoteSS);
    const noteDataString = JSON.stringify(noteData);
        
    fs.writeFile(`./db/db.json`, noteDataString, (err) =>
      err
      ? console.error(err)
      : console.log(
      `Note for ${newNote.title} has been written to JSON file`
      )
    );
      
    const response = {
      status: 'success',
      body: newNote,
    };
  
    res.json(response);
    } else {
      res.json('Error in posting feedback');
      }
  });

  // need a delete
  
  notes.delete('/:id', (req, res) => {
    console.info(`${req.method} request received for notes`);
    // const id = parse(req.params.id);
    const note = req.body;
    console.log(note);
    // console.log(id);
    // const noteData = require('../db/db.json');
    // const noteId = noteData.find((noteData) => note_id === id);
    // if (noteId == id) {
    //   noteData.splice(noteId);
    //   res.status(204).send();
    // } else {
    //   res.status(404).json({error: 'Not not found'});
    // }
  });

  module.exports = notes;