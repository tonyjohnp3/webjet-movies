import React from 'react';

const MovieDetails = props => {
  const { movie, onReturnClick } = props;
  let cheapestPrice = null;

  if (movie.hasOwnProperty('Price')) {
    const { fw, cw } = movie.Price;
    let fwPrice = parseFloat(fw);
    let cwPrice = parseFloat(cw);
    cheapestPrice = getCheapestPrice(fwPrice, cwPrice);
  }

  return (
    <table className="ui selectable structured large table">
      <tbody>
        <tr>
          <th>Title</th>
          <td>{movie.hasOwnProperty('Title') ? movie.Title : '--'}</td>
        </tr>
        <tr>
          <th>Year</th>
          <td>{movie.hasOwnProperty('Year') ? movie.Year : '--'}</td>
        </tr>
        <tr>
          <th>Rated</th>
          <td>{movie.hasOwnProperty('Rated') ? movie.Rated : '--'}</td>
        </tr>
        <tr>
          <th>Released</th>
          <td>{movie.hasOwnProperty('Released') ? movie.Released : '--'}</td>
        </tr>
        <tr>
          <th>Runtime</th>
          <td>{movie.hasOwnProperty('Runtime') ? movie.Runtime : '--'}</td>
        </tr>
        <tr>
          <th>Genre</th>
          <td>{movie.hasOwnProperty('Genre') ? movie.Genre : '--'}</td>
        </tr>
        <tr>
          <th>Director</th>
          <td>{movie.hasOwnProperty('Director') ? movie.Director : '--'}</td>
        </tr>
        <tr>
          <th>Writer</th>
          <td>{movie.hasOwnProperty('Writer') ? movie.Writer : '--'}</td>
        </tr>
        <tr>
          <th>Actors</th>
          <td>{movie.hasOwnProperty('Actors') ? movie.Actors : '--'}</td>
        </tr>
        <tr>
          <th>Plot</th>
          <td>{movie.hasOwnProperty('Plot') ? movie.Plot : '--'}</td>
        </tr>
        <tr>
          <th>Language</th>
          <td>{movie.hasOwnProperty('Language') ? movie.Language : '--'}</td>
        </tr>
        <tr>
          <th>Country</th>
          <td>{movie.hasOwnProperty('Country') ? movie.Country : '--'}</td>
        </tr>
        <tr>
          <th>Awards</th>
          <td>{movie.hasOwnProperty('Awards') ? movie.Awards : '--'}</td>
        </tr>
        <tr>
          <th>Metascore</th>
          <td>{movie.hasOwnProperty('Metascore') ? movie.Metascore : '--'}</td>
        </tr>
        <tr>
          <th>Rating</th>
          <td>{movie.hasOwnProperty('Rating') ? movie.Rating : '--'}</td>
        </tr>
        <tr>
          <th>Votes</th>
          <td>{movie.hasOwnProperty('Votes') ? movie.Votes : '--'}</td>
        </tr>
        <tr>
          <th>Type</th>
          <td>{movie.hasOwnProperty('Type') ? movie.Type : '--'}</td>
        </tr>
        <tr>
          <th>Price</th>
          <td>
            {movie.hasOwnProperty('Price')
              ? `Filmworld: ${movie.Price.fw} - Cinemaworld: ${movie.Price.cw}`
              : '--'}
          </td>
        </tr>
        <tr>
          <th>Cheapest Price</th>
          <td>{cheapestPrice !== null ? cheapestPrice : '--'}</td>
        </tr>
        <tr>
          <td></td>
          <td>
            <button onClick={() => onReturnClick()}>Return</button>
          </td>
        </tr>
      </tbody>
    </table>
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
