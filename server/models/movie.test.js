import app from '../app';
import Movie from './movie';
import Cinemaworld, { mockCinemaworldList, mockCinemaworldGetDetails } from '../__mocks__/Cinemaworld';
import Filmworld, { mockFilmworldList, mockFilmworldGetDetails } from '../__mocks__/Filmworld';
import statusCodes from '../constants/statusCodes';
import { mockFilmworldDetailsResponse, mockFilmworldResponse } from '../fixtures/filmworldResponse';
import { mockCinemaworldResponse, mockCinemaworldDetailsResponse } from '../fixtures/cinemaworldResponse';

jest.mock('Filmworld');
jest.mock('Cinemaworld');

describe('Movie model tests', () => {
  beforeEach(() => {
    Cinemaworld.mockClear();
    Filmworld.mockClear();
    mockCinemaworldList.mockClear();
    mockCinemaworldGetDetails.mockClear();
    mockFilmworldGetDetails.mockClear();
    mockFilmworldList.mockClear();
  });

  it('should run cinemaworld and filmworld list simultaneously and combine results', async () => {
    const combinedMockResponse = {
      filmworldResp: mockFilmworldResponse,
      cinemaworldResp: mockCinemaworldResponse
    };
    const filmworld = new Filmworld();
    const cinemaworld = new Cinemaworld();
    expect(Filmworld).toHaveBeenCalledTimes(1);
    expect(Cinemaworld).toHaveBeenCalledTimes(1);
    cinemaworld.list.mockImplementationOnce(() =>
      Promise.resolve(mockCinemaworldResponse)
    );
    filmworld.list.mockImplementationOnce(() =>
      Promise.resolve(mockFilmworldResponse)
    );

    const movie = new Movie([filmworld, cinemaworld]);
    const response = await movie.fetchAll();

    expect(cinemaworld.list).toHaveBeenCalledTimes(1);
    expect(filmworld.list).toHaveBeenCalledTimes(1);
    expect(response).toEqual(combinedMockResponse);
  });

  it('should run cinemaworld and filmworld getDetails simultaneously and combine results', async () => {
    const combinedMockResponse = {
      filmworldResp: mockFilmworldDetailsResponse,
      cinemaworldResp: mockCinemaworldDetailsResponse
    };
    const filmworld = new Filmworld();
    const cinemaworld = new Cinemaworld();
    expect(Filmworld).toHaveBeenCalledTimes(1);
    expect(Cinemaworld).toHaveBeenCalledTimes(1);
    cinemaworld.getDetails.mockImplementationOnce(() =>
      Promise.resolve(mockCinemaworldDetailsResponse)
    );
    filmworld.getDetails.mockImplementationOnce(() =>
      Promise.resolve(mockFilmworldDetailsResponse)
    );

    const movie = new Movie([filmworld, cinemaworld]);
    const response = await movie.getDetails(['fw0076759', 'cw0076759']);

    expect(cinemaworld.getDetails).toHaveBeenCalledTimes(1);
    expect(filmworld.getDetails).toHaveBeenCalledTimes(1);
    expect(response).toEqual(combinedMockResponse);
  });

  it.skip('should run cinemaworld and filmworld simultaneously', async () => {
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
