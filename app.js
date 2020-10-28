const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const notesRouter = require('./routes/notesRoutes');

app.set('view engine', 'ejs');

app.use(express.static('./public'));
app.use(express.json());
app.use(cookieParser());

app.use('/', notesRouter);

app.use(function (req, res) {
    res.status(404).send('404: Page Not Found');
});

module.exports = app;
