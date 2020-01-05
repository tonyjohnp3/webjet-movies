import request from 'supertest';
import app from './app';
import Filmworld from './services/filmworld';
import Cinemaworld from './services/Cinemaworld';

describe('Node Server', () => {    
    it('/movies should return 200', async () => {
        const response = await request(app).get('/movies');
        expect(response.statusCode).toBe(200);
    });

    
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

    it.skip('cinemaworld list works', async () => {
        const cinemaworld = new Cinemaworld();
        const response = await cinemaworld.list();
        console.log('Cinemaworld response data', JSON.stringify(response.data));
        expect(response.status).toBe(200);
    });

    it('cinemaworld getDetails works', async () => {
        const cinemaworld = new Cinemaworld();
        const response = await cinemaworld.getDetails('cw0076759')
                                    .catch(err => {
                                        console.log('caught cinemaworld error', err);
                                    });
        console.log('Cinemaworld response data', response);
        expect(response.status).toBe(200);
    });

    // it('should run cinemaworld and filmworld simultaneously', async () => {
    //     const filmworld = new Filmworld();
    //     const cinemaworld = new Cinemaworld();
    //     const response = await 
    // });
});