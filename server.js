// Dependencies
// =============================================================
const express = require('express');

const path = require('path');

const app = express();
const api = express();
const router = express.Router();


const PORT = 3001;

const publicDir = path.join(__dirname, 'public')
const apiDir = path.join(__dirname, 'db')
router.use(function (req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path)
  next()
})

// router.get('/notes', function (req, res) {
//   res.sendFile(path.join(publicDir, 'notes.html'))
//  });
 router.use(express.static(path.join(__dirname, 'public')));

router.get('/api/notes' , function( req, res, next) {
  res.sendFile(path.join(apiDir, 'db.json'))
})
router.post('/api/notes' , function( req, res, next) {
  console.log(req.body)
  next()  
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
  console.dir(app.mountpath);
  res.sendFile(path.join(publicDir, 'index.html'))
})
app.get('/notes', (req, res) => {
    console.dir(app.mountpath);
    res.sendFile(path.join(publicDir, 'notes.html'))
});

app.get('/api/notes', (req, res) => {
  // console.dir(api.mountpath);
  console.log(req.headers)
  res.sendFile('/db.json')
})

app.post('/api/notes',(req,res)  => {
  // console.dir(api.mountpath);
  
  // request( (res_db) => {
  //    console.log(res_db);
  // });
  //fetch('/db.json');
  const noteObj = req.body;
  noteObj.id = Math.floor(Math.random()*100);
  console.log(noteObj)
  return 
  // res.json()
//  res.send('OK')
  });


// Listener
// =============================================================
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
