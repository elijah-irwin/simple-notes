// Internal Imports
const Note = require('./note-model');
const AppError = require('../../utils/error');
const { catchAsync } = require('../../utils/helpers');

const createNote = catchAsync(async(req, res, next) => {
    const note = req.body;

    const newNote = new Note(note);
    await newNote.save();

    res.status(201).json({ message: 'Note saved successfully!' });
});

const getAllNotes = catchAsync(async(req, res, next) => {

    // TODO: get user id based of current session, 
    // get all notes belonging to that current user

    const notes = await Note.find();
    res.status(200).send({ data: notes });
});

const getNote = catchAsync(async(req, res, next) => {
    const id = req.params.id;
    const note = await Note.findById(id);

    if (!note) {
        throw new AppError(404, `Note ${id} not found.`);
    }

    res.status(200).json({ data: note });
});

const updateNote = catchAsync(async(req, res, next) => {
    const id = req.params.id;
    const note = req.body;

    const options = { runValidators: true, new: true }
    const updatedNote = await Note.findByIdAndUpdate(id, note, options);

    res.status(200).json({ 
        message: `Note ${id} updated successfully.`, 
        data: updatedNote 
    });
});

const deleteNote = catchAsync(async(req, res, next) => {
    const id = req.params.id;
    await Note.findByIdAndDelete(id);

    res.status(200).json({ message: `Note ${id} deleted successfully.`});
});

module.exports = {
    createNote,
    getAllNotes,
    getNote,
    updateNote,
    deleteNote
};