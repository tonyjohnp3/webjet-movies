import app from '../app';
import Filmworld from '../services/filmworld';
import Cinemaworld from '../services/cinemaworld';
import { reflect } from '../utils/reflectPromise';

describe('Movie model tests', () => {
  it('should run cinemaworld and filmworld simultaneously', async () => {
    const filmworld = new Filmworld();
    const cinemaworld = new Cinemaworld();

    const [filmworldResp, cinemaworldResp] = await Promise.all(
      [filmworld.list(), cinemaworld.list()].map(reflect)
    );

    console.log('filmworldresp', filmworldResp);
    console.log('cinemaworldResp', cinemaworldResp);
    if (filmworldResp.hasOwnProperty('status')) {
      console.log('filmworld status', filmworldResp.status);
      console.log('filmworld data', filmworldResp.data);
    } else if (
      filmworldResp.hasOwnProperty('response') &&
      typeof filmworldResp.response === 'object' &&
      filmworldResp.response.hasOwnProperty('status')
    ) {
      console.log('filmworld status', filmworldResp.response.status);
    } else {
      console.log('flimworld timedout');
    }
    if (cinemaworldResp.hasOwnProperty('status')) {
      console.log('cinemaworld status', cinemaworldResp.status);
      console.log('cinemaworld data', cinemaworldResp.data);
    } else if (
      cinemaworldResp.hasOwnProperty('response') &&
      typeof cinemaworldResp.response === 'object' &&
      cinemaworldResp.response.hasOwnProperty('status')
    ) {
      console.log('cinemaworld status', cinemaworldResp.response.status);
    } else {
      console.log('cinemaworld timedout');
    }
  });
});
