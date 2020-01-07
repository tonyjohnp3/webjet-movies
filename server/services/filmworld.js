import axios from 'axios';
import statusCodes from '../constants/statusCodes';
import ApiError from '../errors/apiError';

class Filmworld {
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://webjetapitest.azurewebsites.net/api/filmworld',
      timeout: 4000,
      headers: {
        'x-access-token': process.env.MOVIE_ACCESS_TOKEN,
      },
    });
  }

  /**
   * Fetch movies from filmworld
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
        console.log('filmworld 400 or 500', err);
        throw new ApiError(err.message, err.response.status); // internal server error or invalid request
      } else {
        console.log('filmworld timeout', err);
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
        console.log('filmworld get details 400 or 500', err);
        throw new ApiError(err.message, err.response.status); // internal server error or invalid request
      } else {
        console.log('filmworld get details timeout', err);
        throw new ApiError(err.message, statusCodes.INTERNAL_SERVER_ERROR); // timedout, try again
      }
    }
  }
}

export default Filmworld;
