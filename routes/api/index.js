
var express = require('express')
const router = require('express').Router();

const { createNote, readNotes, deleteNote } = require('../../lib/notes');


router.use(function (req, res, next) {
  console.log('########## IN API ROUTES ##########\n%s %s %s %s', req.method, req.url, req.path, req.originalUrl);
  next();
  }
)

router.get('/notes' , function( req, res ) {
  const readData = readNotes();
  const response = {
    "notes": JSON.parse(readData)
  }

  res.json(response.notes);
  })

router.post('/notes' , (req, res) => {
  const readData = readNotes();
  const response = {
    "notes": JSON.parse(readData)
  }
  
  req.body.id = response.notes.length.toString();
  const newNote = createNote(req.body, response.notes);
  res.json(newNote);
});
router.delete('/notes/:id' , (req, res) => {
  const readData = readNotes();
  const response = {
    "notes": JSON.parse(readData)
  }
  const removed = deleteNote(req.params.id, response.notes);
  res.json(removed);
});
module.exports = router;
