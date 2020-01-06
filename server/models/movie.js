import { reflect } from '../utils/reflectPromise';

export default class Movie {
  constructor(sources) {
    this.sources = sources;
  }

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
