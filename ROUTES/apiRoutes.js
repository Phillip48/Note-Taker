const router = require('express').Router();
// const req = require('express/lib/request');
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');


router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// select notes
router.get('/notes:id', (req, res) => {
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id === req.params.id);
            return result.length > 0
                ? res.json(result)
                : res.json('No tip with that ID');
        });
});

//post notes
router.post('/notes', (req, res) => {
    // console.info(`${req.method} request received to add a note`)
    console.log(req.body)

    const { title, text, id } = req.body;
    const newNote = {
        title,
        text,
        id: uuidv4()
    };

    if (req.body) {
        readAndAppend(newNote, './db/db.json');
        res.json('Note added');
    } else {
        res.error('Error in adding note');
    }
});


// DELETE 
router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.tip_id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            // Make a new array of all tips except the one with the ID provided in the URL
            const result = json.filter((note) => note.id !== noteId);

            // Save that array to the filesystem
            writeToFile('./db/db.json', result);

            // Respond to the DELETE request
            res.json(`Item ${noteId} has been deleted 🗑️`);
        });
});


module.exports = router;