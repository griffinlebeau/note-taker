const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended:true}));
app.use(express.json());
const PORT = process.env.PORT || 3001;
const { notes } = require('./db/db.json');
function validateNote(note) {
    if(!note.title || typeof note.title !== 'string') {return false};
    if(!note.text || typeof note.text !== 'string') {return false};
    return true;
}
function createNewNote(body, notesArray){
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'), JSON.stringify({ notes:notesArray }, null, 2)
    )
    return note;
}
function filterByQuery(query, notesArray) { 
    let filteredResults = notesArray;}
app.get('/api/notes', (req, res) => { res.json(notes)});
app.post('/api/notes', (req, res) => { 
    console.log(req.body); 
    req.body.id = notes.length.toString();
    if (validateNote(req.body)){
        res.status(400).send('The note is not properly formatted.')
    } else {const note = createNewNote(req.body, notes);
    res.json(note)}});
app.listen(PORT, () => {
    console.log(`Note Taker server now on port ${PORT}`) 
})