const fs = require('fs');
const router = require('express').Router();
const { validateNote, createNewNote } = require('../../lib/notes.js')
const{ notes } = require('../../db/db.json');


router.get('/api/notes', (req, res) => {
    fs.readFile("db/db.json", "utf-8", (err, notes) => {
        if (err) throw err;
        res.json(JSON.parse(notes))
            }
        )
    }
);

router.post('/api/notes', (req, res) => { 
    console.log(req.body); 
    req.body.id = notes.length + 1;
    if (!validateNote(req.body)){
        res.status(400).send('The note is not properly formatted.')
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
        }
    }
);



module.exports = router