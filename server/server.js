// NPM Imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const chalk = require('chalk');

// Internal Imports
const { connectToDB } = require('./src/db');
const NoteRoutes = require('./src/routes/note/note-routes');
const { baseErrorHandler } = require('./src/utils/middleware');

// Initialize Express App
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectToDB();

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Notes Backend' });
});

app.use('/api', NoteRoutes);
app.use(baseErrorHandler);

// Listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(chalk.blue(`[server] Listening at: http://localhost:${port}`));
});