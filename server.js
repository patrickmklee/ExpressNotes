// Dependencies
// =============================================================
const express = require('express');
const { readFile,writeFile } = require('fs');

const path = require('path');

const app = express();
const api = express();
const router = express.Router();


const PORT = 3001;

const notesArray = [];
const publicDir = path.join(__dirname, 'public')
const apiDir = path.join(__dirname, 'db')
router.use(function (req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
})
router.use(express.static(path.join(__dirname, 'public')));
router.use('/api',  function (req, res, next) {
  // ... maybe some additional /bar logging ...
  console.log('API ACCESS: %s %s %s', req.method, req.url, req.path);

  next();
});
router.get('/api/notes' , function( req, res, next ) {
  //res.sendFile(path.join(apiDir, 'db.json'))
  let dbPath = path.join(apiDir,'db.json')
  res.sendFile(dbPath)
  //next()
 // });
})

router.get('/api/notes/:id' , function( req, res) {
  const chosen = req.params.id;

  console.log(chosen);

  let dbPath = path.join(apiDir,'db.json');
  readFile(dbPath,'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data)
    console.log(notes)
    
    for (let i = 0; i < notes.length; i++) {
      console.log(notes[i].id);
      if (chosen === notes[i].id) {
        res.json(notes[i]);
      }
    }
  })
  

  //res.sendFile(path.join(apiDir, 'db.json'))
  //let dbPath = path.join(apiDir,'db.json')
  //res.sendFile(dbPath)
  //next()
 // });
})

router.post('/api/notes' , 
  function( req, res, next) {
  const newNote = req.body;
  
  newNote.id = Math.floor(Math.random()*100);
  console.log(newNote);
  let dbPath = path.join(apiDir,'db.json')
  
    readFile(dbPath,'utf8', (err, data) => {
      if (err) throw err;
      const noteData = JSON.parse(data)
      noteData.push(newNote);
      console.log(noteData);
      noteDataStr = JSON.stringify(noteData)
      
      writeFile(dbPath, noteData, 'utf8', (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
        res.json(noteData)
      });
    })
  next();
    
  // readFile('/db.json', (response) => {
  //   console.log(response)
  //if (response.ok) {
  //  console.log(response.json())
  //} else {
  //      console.log("ERROR")
  //  }
  // });
  
  
  // console.log(newNote);
  // console.log(dbPath)
  //res.send
  //characters.push(newCharacter);

  //res.json(newCharacter);
  //next();
})
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
api.use(express.urlencoded({ extended: true }));

// public.use(express.urlencoded( ))
app.use(express.json());
api.use(express.json());


app.use('/', router);

// public.use(express.static(path.join(__dirname, 'public)')));
// =============================================================
app.get('/', (req, res) => {
  // console.dir(app.mountpath);
  res.sendFile(path.join(publicDir, 'index.html'))
})
app.get('/notes', (req, res) => {
    console.dir(app.mountpath);
    res.sendFile(path.join(publicDir, 'notes.html'))
});

// app.get('/api/notes', (req, res) => {
//   // console.dir(api.mountpath);
  
//   console.log(req.headers);
//   res.sendFile();
// })

app.post('/api/notes',(req,res)  => {
  // console.dir(api.mountpath);
  
  // request( (res_db) => {
  //    console.log(res_db);
  // });
  const noteObj = req.body;
  
  noteObj.id = Math.floor(Math.random()*100);
  console.log(noteObj)
  
  // readFile('/db.json', (response) => {
  //   console.log(response)
  //if (response.ok) {
  //  console.log(response.json())
  //} else {
  //      console.log("ERROR")
  //  }
  // });
  res.json(noteObj)
  // res.json()
//  res.send('OK')
  });


// Listener
// =============================================================
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
