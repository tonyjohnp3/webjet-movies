import app from '../app';
import Filmworld from './filmworld';

describe('Filmworld tests', () => {
  it.skip('filmworld list works', async () => {
    const filmworld = new Filmworld();
    const response = await filmworld.list();
    console.log('Filmworld response data', JSON.stringify(response.data));
    expect(response.status).toBe(200);
  });

  it.skip('filmworld getDetails works', async () => {
    const filmworld = new Filmworld();
    const response = await filmworld.getDetails('fw0076759');
    console.log('Filmworld response data', JSON.stringify(response.data));
    expect(response.status).toBe(200);
  });
});
