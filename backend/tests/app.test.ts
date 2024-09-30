import request from 'supertest';
import app from '../src/index'; 

describe('GET /', () => {
  it('should return a 200 status and Task Manager API message', async () => {
    const response = await request(app).get('/').set('Origin', 'http://localhost:3000');;
    expect(response.status).toBe(200);
    expect(response.text).toBe('Task Manager API');
  });
});
