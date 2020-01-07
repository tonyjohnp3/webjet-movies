import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginTop: 20,
  },
});

const MovieDetails = props => {
  const { movie, onReturnClick, isLoading } = props;
  let cheapestPrice = null;
  const classes = useStyles();

  if (movie.hasOwnProperty('Price')) {
    const { fw, cw } = movie.Price;
    let fwPrice = parseFloat(fw);
    let cwPrice = parseFloat(cw);
    cheapestPrice = getCheapestPrice(fwPrice, cwPrice);
  }

  return isLoading ? 'Loading...' : (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell variant="head">Title</TableCell>
            <TableCell>{movie.hasOwnProperty('Title') ? movie.Title : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Year</TableCell>
            <TableCell>{movie.hasOwnProperty('Year') ? movie.Year : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Price</TableCell>
            <TableCell>
              {movie.hasOwnProperty('Price')
                ? `Filmworld: ${movie.Price.fw} - Cinemaworld: ${movie.Price.cw}`
                : '--'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Cheapest Price</TableCell>
            <TableCell>{cheapestPrice !== null ? cheapestPrice : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Rated</TableCell>
            <TableCell>{movie.hasOwnProperty('Rated') ? movie.Rated : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Released</TableCell>
            <TableCell>{movie.hasOwnProperty('Released') ? movie.Released : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Runtime</TableCell>
            <TableCell>{movie.hasOwnProperty('Runtime') ? movie.Runtime : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Genre</TableCell>
            <TableCell>{movie.hasOwnProperty('Genre') ? movie.Genre : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Director</TableCell>
            <TableCell>{movie.hasOwnProperty('Director') ? movie.Director : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Writer</TableCell>
            <TableCell>{movie.hasOwnProperty('Writer') ? movie.Writer : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Actors</TableCell>
            <TableCell>{movie.hasOwnProperty('Actors') ? movie.Actors : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Plot</TableCell>
            <TableCell>{movie.hasOwnProperty('Plot') ? movie.Plot : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Language</TableCell>
            <TableCell>{movie.hasOwnProperty('Language') ? movie.Language : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Awards</TableCell>
            <TableCell>{movie.hasOwnProperty('Awards') ? movie.Awards : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Metascore</TableCell>
            <TableCell>{movie.hasOwnProperty('Metascore') ? movie.Metascore : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Rating</TableCell>
            <TableCell>{movie.hasOwnProperty('Rating') ? movie.Rating : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Votes</TableCell>
            <TableCell>{movie.hasOwnProperty('Votes') ? movie.Votes : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Type</TableCell>
            <TableCell>{movie.hasOwnProperty('Type') ? movie.Type : '--'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              <Button variant="contained" color="primary" onClick={() => onReturnClick()}>Return</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const getCheapestPrice = (price1, price2) => {
  if (!isNaN(price1) && !isNaN(price2)) {
    return price1 < price2 ? price1 : price2;
  } else if (!isNaN(price2)) {
    return price2;
  } else if (!isNaN(price1)) {
    return price1;
  } else {
    return null;
  }
};

export default MovieDetails;
