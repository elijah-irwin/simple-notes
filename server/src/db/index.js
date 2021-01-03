const mongoose = require('mongoose');
const chalk = require('chalk');

const connectToDB = () => {
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log(chalk.blue('[db] Successfully connected to the database.'));
        })

        .catch(e => {
            throw new Error(e);
        });
};

mongoose.connection.on('error', e => {
    throw new Error(e);
});

module.exports = {
    connectToDB
};

