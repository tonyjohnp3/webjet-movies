import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginTop: 20,
  },
});

const MoviesList = props => {
  const { movies, isLoading, onMovieSelect } = props;
  const classes = useStyles();

  const movieRows = movies.map((movie, index) => (
    <TableRow key={index}>
      <TableCell component="th" scope="row">
        {movie.Title}
      </TableCell>
      <TableCell>{movie.Year}</TableCell>
      <TableCell>{movie.Type}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onMovieSelect(movie)}
        >
          Details
        </Button>
      </TableCell>
    </TableRow>
  ));

  return isLoading ? (
    'Loading...'
  ) : (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Type</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{movieRows}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default MoviesList;
