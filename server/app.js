import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import Movies from './api/movies';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.use('/movies', Movies.list);
app.use('/movie/fwid/:fwid/cwid/:cwid', Movies.getDetails);

export default app;
