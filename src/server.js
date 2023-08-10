const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

module.exports = app;