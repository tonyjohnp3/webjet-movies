import app from '../app';
import Cinemaworld from './Cinemaworld';
import axios from 'axios';
import { mockCinemaworldDetailsResponse, mockCinemaworldResponse } from '../fixtures/cinemaworldResponse';

jest.mock('axios');

describe('Cinemaworld tests', () => {
  beforeEach(() => {
    axios.create.mockClear();
    axios.get.mockClear();
  });

  it('cinemaworld list works', async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve(mockCinemaworldResponse)
    );

    const cinemaworld = new Cinemaworld();
    const response = await cinemaworld.list();
    // console.log('Cinemaworld response data', JSON.stringify(response));
    expect(axios.create).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/movies');
    expect(response.status).toEqual(200);
    expect(response).toEqual(mockCinemaworldResponse);
  });

  it('cinemaworld getDetails works', async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve(mockCinemaworldDetailsResponse)
    );

    const cinemaworld = new Cinemaworld();
    const response = await cinemaworld.getDetails('cw0076759');
    // console.log('Cinemaworld response data', response);
    expect(axios.create).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/movie/cw0076759');
    expect(response.status).toEqual(200);
    expect(response).toEqual(mockCinemaworldDetailsResponse);
  });
});
