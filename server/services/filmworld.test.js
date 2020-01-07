import app from '../app';
import Filmworld from './filmworld';
import axios from 'axios';
import { mockFilmworldDetailsResponse, mockFilmworldResponse } from '../fixtures/filmworldResponse';

jest.mock('axios');

describe('Filmworld tests', () => {
  beforeEach(() => {
    axios.create.mockClear();
    axios.get.mockClear();
  });

  it('filmworld list works', async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve(mockFilmworldResponse)
    );

    const filmworld = new Filmworld();
    const response = await filmworld.list();
    // console.log('Cinemaworld response data', JSON.stringify(response));
    expect(axios.create).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/movies');
    expect(response.status).toEqual(200);
    expect(response).toEqual(mockFilmworldResponse);
  });

  it('filmworld getDetails works', async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve(mockFilmworldDetailsResponse)
    );

    const filmworld = new Filmworld();
    const response = await filmworld.getDetails('fw0076759');
    // console.log('Cinemaworld response data', response);
    expect(axios.create).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/movie/fw0076759');
    expect(response.status).toEqual(200);
    expect(response).toEqual(mockFilmworldDetailsResponse);
  });
});
