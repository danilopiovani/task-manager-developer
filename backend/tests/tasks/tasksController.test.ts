import request from 'supertest';
import app from '../../src/index'; 

describe('Task Manager API', () => {

    let taskId: string; 

    it('should create a new task', async () => {
        const response = await request(app)
            .post('/tasks')
            .set('Origin', 'http://localhost:3000') 
            .send({
                title: 'New Task',
                description: 'A new task description'
            });
        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            id: response.body.id,
            title: 'New Task',
            description: 'A new task description',
            completed: false
        });
        taskId = response.body.id;
    });

    it('should retrieve all tasks', async () => {
        const response = await request(app).get('/tasks').set('Origin', 'http://localhost:3000') ;
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toEqual(true);
    });

    it('should return 404 for non-existent task', async () => {
        const response = await request(app).get('/tasks/noExistentTask').set('Origin', 'http://localhost:3000') ;
        expect(response.status).toBe(404);
        expect(response.text).toBe('Task not found');
    });

    it('should retrieve a single task', async () => {
        const response = await request(app).get(`/tasks/${taskId}`).set('Origin', 'http://localhost:3000') ;
        expect(response.status).toBe(200);
        expect(response.body.id).toEqual(taskId);
    });

    it('should update a task', async () => {
        const response = await request(app)
            .put(`/tasks/${taskId}`)
            .set('Origin', 'http://localhost:3000') 
            .send({
                title: 'Updated Task',
                description: 'An updated task description',
                completed: true
            });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: taskId,
            title: 'Updated Task',
            description: 'An updated task description',
            completed: true
        });
    });

    it('should return 400 for missing title or description', async () => {
        const response = await request(app)
            .post('/tasks')
            .set('Origin', 'http://localhost:3000') 
            .send({
                title: 'New Task'
            });
        expect(response.status).toBe(400);
        expect(response.text).toBe('Title and description are required');
    });

    it('should return 404 for non-existent task', async () => {
        const response = await request(app)
            .put('/tasks/noExistentTask')
            .set('Origin', 'http://localhost:3000') 
            .send({
                title: 'Updated Task',
                description: 'An updated task description',
                completed: true
            });
        expect(response.status).toBe(404);
        expect(response.text).toBe('Task not found');
    });

    it('should delete a task', async () => {
        const response = await request(app).delete(`/tasks/${taskId}`).set('Origin', 'http://localhost:3000');
        expect(response.status).toBe(204);
    });

    describe('CORS', () => {
        it('should allow requests from the specified origin', async () => {
            const response = await request(app)
                .options('/tasks')
                .set('Origin', 'http://localhost:3000');

            expect(response.status).toBe(200);
            expect(response.headers['access-control-allow-origin']).toBe('http://localhost:3000');
            expect(response.headers['access-control-allow-methods']).toContain('GET, POST, PUT, DELETE');
            expect(response.headers['access-control-allow-headers']).toContain('Content-Type');
        });

        it('should disallow requests from other origins', async () => {
            const response = await request(app)
                .options('/tasks')
                .set('Origin', 'http://other-origin.com');

            expect(response.status).toBe(403);
        });
    });
});