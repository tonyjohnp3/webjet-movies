import React from 'react';
// import '.MoviesList.css';

const MoviesList = props => {
  const { movies, isLoading, onMovieSelect } = props;

  const movieRows = movies.map((movie, index) => (
    <tr key={index}>
      <td>{movie.Title}</td>
      <td className="right aligned">{movie.Year}</td>
      <td className="right aligned">{movie.Type}</td>
      <td>
        <button onClick={() => onMovieSelect(movie)}>Details</button>
      </td>
    </tr>
  ));

  return (
    <table className="ui selectable structured large table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Year</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>{isLoading ? 'Loading' : movieRows}</tbody>
    </table>
  );
};

export default MoviesList;
