// NPM Imports
const express = require('express');
const router = express.Router();

// Internal Imports
const NoteController = require('./note-controller');

// Notes Routes
router.post('/note', NoteController.createNote);
router.get('/note/all', NoteController.getAllNotes);
router.get('/note/:id', NoteController.getNote);
router.put('/note/:id', NoteController.updateNote);
router.delete('/note/:id', NoteController.deleteNote);

module.exports = router;