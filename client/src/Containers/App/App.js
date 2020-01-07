import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import MoviesList from '../../Components/MoviesList/MoviesList';
import MovieDetails from '../../Components/MovieDetails/MovieDetails';
import AppHeader from '../../Components/AppHeader/AppHeader';

class App extends Component {
  state = {
    movies: [],
    isLoading: true,
    movie: {},
    isMovieSelected: false,
  };

  async componentDidMount() {
    console.log(`inside componentdidmount`, this.state);
    const apiRes = await this.makeRequest();
    this.setState({ ...this.state, ...apiRes, isLoading: false });
  }

  async componentDidUpdate() {
    console.log(`inside componentdidupdate`, this.state);
    if (!this.state.isLoading) {
      return;
    }
    const apiRes = await this.makeRequest();
    this.setState({ ...this.state, ...apiRes, isLoading: false });
  }

  async makeRequest() {
    let movies = [];
    let movie = {};

    try {
      if (!this.state.isMovieSelected) {
        const result = await axios.get('/movies');
        const { filmworldResp, cinemaworldResp } = result.data;
        console.log('Filmworld', filmworldResp);
        console.log('Cinemaworld', cinemaworldResp);
        movies = this.mergeMoviesList(filmworldResp, cinemaworldResp);
        console.log('Movies', movies);
        return { movies };
      } else {
        let { fwID, cwID } = this.state.movie.IDs;
        fwID = fwID !== '' ? fwID : 'null';
        cwID = cwID !== '' ? cwID : 'null';
        const result = await axios.get(`/movie/fwid/${fwID}/cwid/${cwID}`);
        const { filmworldResp, cinemaworldResp } = result.data;
        console.log('Filmworld details', filmworldResp);
        console.log('Cinemaworld details', cinemaworldResp);
        movie = this.mergeMovieDetails(filmworldResp, cinemaworldResp);
        console.log('Movie details', movie);
        return { movie };
      }
    } catch (err) {
      console.log(err);
    }
  }

  onMovieSelect = movie => {
    console.log('Movie', movie);
    this.setState({
      ...this.state,
      movie,
      isMovieSelected: true,
      isLoading: true,
    });
  };

  onReturnClick = () => {
    this.setState({
      ...this.state,
      isMovieSelected: false,
      isLoading: false,
    });
  };

  mergeMoviesList(filmworldResp, cinemaworldResp) {
    if (
      !filmworldResp.hasOwnProperty('data') &&
      !cinemaworldResp.hasOwnProperty('data')
    ) {
      return [];
    } else if (!filmworldResp.hasOwnProperty('data')) {
      return cinemaworldResp.data.Movies.map(movie => {
        const { Title, Year, Type, Poster } = movie;
        return {
          Title,
          Year,
          Type,
          Poster,
          IDs: {
            fwID: '',
            cwID: movie.ID,
          },
        };
      });
    } else if (!cinemaworldResp.hasOwnProperty('data')) {
      return filmworldResp.data.Movies.map(movie => {
        const { Title, Year, Type, Poster } = movie;
        return {
          Title,
          Year,
          Type,
          Poster,
          IDs: {
            fwID: movie.ID,
            cwID: '',
          },
        };
      });
    } else {
      return this.mergeMoviesArrays(
        filmworldResp.data.Movies,
        cinemaworldResp.data.Movies
      );
    }
  }

  mergeMoviesArrays(fwArr, cwArr) {
    const temp = fwArr.map(fw => {
      const { Title, Year, Type, Poster } = fw;
      const match = cwArr.filter(cw => cw.Title === Title);
      let result = {
        Title,
        Year,
        Type,
        Poster,
        IDs: {
          fwID: fw.ID,
          cwID: '',
        },
      };
      if (match.length > 0) {
        result.IDs.cwID = match[0].ID;
      }
      console.log('match res', result);
      return result;
    });

    const remaining = cwArr
      .filter(cw => temp.findIndex(el => el.Title === cw.Title) === -1)
      .map(cw => {
        const { Title, Year, Type, Poster } = cw;
        return {
          Title,
          Year,
          Type,
          Poster,
          IDs: {
            fwID: '',
            cwID: cw.ID,
          },
        };
      });

    return temp.concat(remaining);
  }

  mergeMovieDetails(filmworldResp, cinemaworldResp) {
    if (
      !filmworldResp.hasOwnProperty('data') &&
      !cinemaworldResp.hasOwnProperty('data')
    ) {
      return [];
    } else if (!filmworldResp.hasOwnProperty('data')) {
      return {
        ...cinemaworldResp.data,
        IDs: {
          fwID: '',
          cwID: cinemaworldResp.data.ID,
        },
        Price: {
          fw: '',
          cw: cinemaworldResp.data.Price,
        },
      };
    } else if (!cinemaworldResp.hasOwnProperty('data')) {
      return {
        ...filmworldResp.data,
        IDs: {
          fwID: filmworldResp.data.ID,
          cwID: '',
        },
        Price: {
          fw: filmworldResp.data.Price,
          cw: '',
        },
      };
    } else {
      return this.mergeMovieObjects(filmworldResp.data, cinemaworldResp.data);
    }
  }

  mergeMovieObjects(fwObj, cwObj) {
    return {
      ...fwObj,
      IDs: {
        fwID: fwObj.ID,
        cwID: cwObj.ID,
      },
      Price: {
        fw: fwObj.Price,
        cw: cwObj.Price,
      },
    };
  }

  render() {
    return (
      <div className="App">
        {!this.state.isMovieSelected ? <AppHeader title="Movies List"/> : <AppHeader title="Movie Details"/>}
        {!this.state.isMovieSelected ? (
          <MoviesList
            movies={this.state.movies}
            isLoading={this.state.isLoading}
            onMovieSelect={this.onMovieSelect}
          />
        ) : (
          <MovieDetails
            movie={this.state.movie}
            onReturnClick={this.onReturnClick}
            isLoading={this.state.isLoading}
          />
        )}
      </div>
    );
  }
}

export default App;
