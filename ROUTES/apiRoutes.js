const router = require('express').Router();
// const req = require('express/lib/request');
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// router.get('/notes/:id', (req, res) => {
//     readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
// });

router.post('/notes', (req, res) => {
    // console.info(`${req.method} request received to add a note`)
    console.log(req.body)

    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4()
        }
        readAndAppend(newNote, './db/db.json');
        res.json('Note added');
    } else {
        res.error('Error in adding note');
    }
});


module.exports = router;