const router = require('express').Router();
const { validateNote, createNewNote } = require('./lib/notes.js')
const { notes } = require('./db/db.json');


router.get('/api/notes', (req, res) => { 
    res.json(notes)});

router.post('/api/notes', (req, res) => { 
    console.log(req.body); 
    req.body.id = notes.length.toString();
    if (validateNote(req.body)){
        res.status(400).send('The note is not properly formatted.')
    } else {const note = createNewNote(req.body, notes);
    res.json(note)}});


module.exports = router;