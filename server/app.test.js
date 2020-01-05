import request from 'supertest';
import app from './app';

describe('Node Server', () => {    
    it('/movies should return 200', async () => {
        const response = await request(app).get('/movies');
        expect(response.statusCode).toBe(200);
    });
});