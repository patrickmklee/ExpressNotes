// Dependencies
// =============================================================


const express = require('express');
const path = require('path')
const routes = require('./routes');


const app = express();

const PORT = 3001;
// Sets up the Express app to handle data parsing  

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(routes)
app.use(express.static(path.join(__dirname,'public')))

// const db = require('../../db/db');
app.get('/' , (req, res) => {
  res.sendFile(path.join(__dirname,'public','index.html'))
});
app.get('/notes' , function( req, res ) {
  res.sendFile(path.join(__dirname,'public','notes.html'))
  })
// app.post('/notes/:id' , function( req, res ) {
//   res.sendFile(path.join(__dirname,'public','notes.html'))
// })
app.get('*' , (req, res) => {
  res.sendFile(path.join(__dirname,'public','index.html'))
});

// Listener
// =============================================================
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
