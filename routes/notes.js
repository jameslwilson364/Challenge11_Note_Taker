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
      : console.log(`Note for ${newNote.title} has been written to JSON file`)
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

notes.delete('/:id', (req, res) => {
    console.info(`${req.method} request received for notes`);
    const noteId = req.params.id;
    console.log(noteId);
    const noteData = require('../db/db.json');
    if (noteId !== null) {
    // const noteDataTemp = JSON.parse(noteData);
    const newNotes = noteData.filter((note) => note.id !== noteId);
    const newNoteDataString = JSON.stringify(newNotes);

    fs.writeFile(`./db/db.json`, newNoteDataString, (err) =>
    err
    ? console.error(err)
    : console.log(`Note id ${noteId} has been deleted from the JSON file`)
  ); 
    
    
    const response = {
      status: 'success',
    };
  
    res.json(response);
    } else {
      res.json('Error in posting feedback');
    }
   
    
});

module.exports = notes;