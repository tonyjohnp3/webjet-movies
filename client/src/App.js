import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import MoviesList from './MoviesList'; 

class App extends Component {
  state = {
    movies: [], 
    isLoading: true,
    movie: {},
    isList: true,
    isDetails: false
  };

  async componentDidMount() {
    try {
      const result = await axios.get('/movies');
      const { filmworldResp, cinemaworldResp } = result.data;
      console.log('Filmworld', filmworldResp);
      console.log('Cinemaworld', cinemaworldResp);
      const movies = await this.mergeMoviesList(filmworldResp, cinemaworldResp);
      this.setState({movies, isLoading: false});
      console.log('Movies', movies);
    } catch (err) {
      console.log(err);
    }
  }

  getDetails

  async mergeMoviesList(filmworldResp, cinemaworldResp) {
    if (!filmworldResp.hasOwnProperty('data') && !cinemaworldResp.hasOwnProperty('data')) {
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
            cwID: movie.ID
          }
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
            cwID: ''
          }
        };
      });
    } else {
      return await this.mergeMoviesArrays(filmworldResp.data.Movies, cinemaworldResp.data.Movies);
    }
  }

  async mergeMoviesArrays(fwArr, cwArr) {
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
          cwID: ''
        }
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
                            cwID: cw.ID
                          }
                        };
                      });

    return temp.concat(remaining);
  }

  render() {
    return (
      <div className="App">
        <MoviesList movies={this.state.movies} isLoading={this.state.isLoading}/>
      </div>
    );
  }
}

export default App;
