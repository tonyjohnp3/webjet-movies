import axios from 'axios';
import statusCodes from '../constants/statusCodes';
import ApiError from '../errors/apiError';

class Cinemaworld {
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://webjetapitest.azurewebsites.net/api/cinemaworld',
      timeout: 4000,
      headers: {
        'x-access-token': process.env.MOVIE_ACCESS_TOKEN,
      },
    });
  }

  /**
   * Fetch movies from cinemaworld
   */
  async list() {
    try {
      const url = '/movies';
      const result = await this.instance.get(url);

      return {
        status: result.status,
        data: result.data,
      };
    } catch (err) {
      if (
        err.hasOwnProperty('response') &&
        typeof err.response === 'object' &&
        err.response.hasOwnProperty('status')
      ) {
        console.log('cinemaworld 400 or 500', err);
        throw new ApiError(err.message, err.response.status); // internal server error or invalid request
      } else {
        console.log('cinemaworld timeout', err);
        throw new ApiError(err.message, statusCodes.INTERNAL_SERVER_ERROR); // timedout, try again
      }
    }
  }

  /**
   * Get details for particular movie
   * 
   * @param {string} id - movie ID 
   */
  async getDetails(id) {
    try {
      const url = `/movie/${id}`;
      const result = await this.instance.get(url);

      return {
        status: result.status,
        data: result.data,
      };
    } catch (err) {
      if (
        err.hasOwnProperty('response') &&
        typeof err.response === 'object' &&
        err.response.hasOwnProperty('status')
      ) {
        console.log('cinemaworld get details 400 or 500', err);
        throw new ApiError(err.message, err.response.status); // internal server error or invalid request
      } else {
        console.log('cinemaworld get details timeout', err);
        throw new ApiError(err.message, statusCodes.INTERNAL_SERVER_ERROR); // timedout, try again
      }
    }
  }
}

export default Cinemaworld;
