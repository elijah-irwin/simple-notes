// NPM Imports
const request = require('supertest');
const mongoose = require('mongoose');

// Internal Imports
const Note = require('./note-model');
const app = require('../../../server');

const TestNote = {
    _id: new mongoose.Types.ObjectId(),
    note: "This is a test note!"
};

// Jest Setup/Teardown
beforeEach(async () => {
    await Note.deleteMany({});
    await new Note(TestNote).save();
});

describe('Note Route Tests', () => {

    it('should POST a new note', async done => {
        const note = { note: "Test note!" };
        const res = await request(app)
            .post('/api/note')
            .send(note);

        expect(res.status).toBe(201);
        done();
    });

    it('should GET an existing note', async done => {
        const res = await request(app)
            .get('/api/note/' + TestNote._id);

        expect(res.status).toBe(200);
        expect(res.body.data).toBeDefined();
        done();
    });

    it('Should throw an error trying to GET a non-existant note', async done => {
        const res = await request(app)
            .get('/api/note/' + new mongoose.Types.ObjectId());
        
        expect(res.status).toBe(404);
        done();
    });

    it('Should GET all notes', async done => {
        const res = await request(app)
            .get('/api/note/all');
        
        expect(res.status).toBe(200);
        expect(res.body.data).toBeInstanceOf(Array);
        done();
    });

    it('Should PUT an existing note', async done => {
        const res = await request(app)
            .put('/api/note/' + TestNote._id)
            .send({ note: 'Updated note!' });
        
        expect(res.status).toBe(200);
        expect(res.body.data.note).toBe('Updated note!');
        done();
    });

    it('Should DELETE an existing note', async done => {
        const res = await request(app)
            .delete('/api/note/' + TestNote._id);
        
        expect(res.status).toBe(200);
        done();
    });
});

