import app from '../app';
import Cinemaworld from './Cinemaworld';
import axios from 'axios';
import { mockFilmworldResponse } from '../fixtures/filmworldResponse';

jest.mock('axios');

describe('Cinemaworld tests', () => {
  beforeEach(() => {
    axios.create.mockClear();
    axios.get.mockClear();
  });

  it('cinemaworld list works', async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve(mockFilmworldResponse)
    );

    const cinemaworld = new Cinemaworld();
    const response = await cinemaworld.list();
    // console.log('Cinemaworld response data', JSON.stringify(response));
    expect(axios.create).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/movies');
    expect(response.status).toEqual(200);
    expect(response).toEqual(mockFilmworldResponse);
  });

  it.skip('cinemaworld getDetails works', async () => {
    const cinemaworld = new Cinemaworld();
    const response = await cinemaworld.getDetails('cw0076759').catch(err => {
      console.log('caught cinemaworld error', err);
    });
    console.log('Cinemaworld response data', response);
    expect(response.status).toBe(200);
  });
});
