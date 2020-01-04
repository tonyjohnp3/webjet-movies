const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const movies = require('./api/movies');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.use('/movies', movies.getMovies);

app.listen(port, () => {
    console.log('Server running on port ' + port);
});