// NPM Imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const chalk = require('chalk');

// Internal Imports
const { connectToDB } = require('./src/db');

// Initialize Express App
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectToDB();

// Base Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(chalk.blue(`[server] Listening at: http://localhost:${port}`));
});