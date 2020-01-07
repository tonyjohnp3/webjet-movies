import { reflect } from '../utils/reflectPromise';

export default class Movie {
  constructor(sources) {
    this.sources = sources;
  }

  /**
   * Simultaneously fetch movies from filmworld and cinemaworld
   */
  async fetchAll() {
    try {
      const [filmworldResp, cinemaworldResp] = await Promise.all(
        this.sources.map(source => source.list()).map(reflect)
      );
      return {
        filmworldResp,
        cinemaworldResp,
      };
    } catch (err) {
      console.log('Movie class fetchall exception', err);
      throw new Error('Could not fetch movies');
    }
  }

  /**
   * Simultaneously fetch filmworld and cinemaworld movie details
   * 
   * @param {[string, string]} ids - [filmworldId, cinemaworldId]
   */
  async getDetails(ids) {
    try {
      const [filmworldResp, cinemaworldResp] = await Promise.all(
        this.sources
          .map((source, index) => source.getDetails(ids[index]))
          .map(reflect)
      );
      return {
        filmworldResp,
        cinemaworldResp,
      };
    } catch (err) {
      console.log('Movie class getdetials exception', err);
      throw new Error('Could not get detials for movie');
    }
  }
}
