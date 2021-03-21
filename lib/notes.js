const fs = require('fs');
const path = require('path');



function readNotes() {
  let readData = fs.readFileSync(path.join(__dirname,'..','db','db.json'),'utf8')
  return readData;
}
function createNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(path.join(__dirname,'..','db','db.json'),
    JSON.stringify( notesArray, null, 2)
  )
  return note
  }
function deleteNote(id,notesArray) {
  const found = notesArray.filter( note => { return (note.id !== id) });
  console.log(found)
  const removedNote = notesArray.splice(id-1,1);
  console.log(removedNote)
  fs.writeFileSync(path.join(__dirname,'..','db','db.json'),
    JSON.stringify( found, null, 2)
  )
  return removedNote
}

module.exports = { createNote, readNotes, deleteNote }