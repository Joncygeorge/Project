require('dotenv').config();
const request = require('supertest');
const { app, server } = require('./script'); 
const db = require('./db');

jest.mock('./db', () => ({
    query: jest.fn(),
}));

beforeAll(() => {
    
    if (!server.listening) {
        server.listen(3000, () => {
            console.log('Test server running on port 3000');
        });
    }
});

afterAll(() => {
   
    if (server) {
        server.close(); 
    }
});

describe('Train API Endpoints', () => {
    describe('GET /trains', () => {
        it('should return a list of trains', async () => {
            const mockTrains = [
                { train_id: 1, name: 'Express Train', train_type: 'Express', status: 'On Time' },
                { train_id: 2, name: 'Local Train', train_type: 'Local', status: 'Delayed' },
            ];

            db.query.mockImplementation((query, callback) => callback(null, mockTrains));

            const res = await request(app).get('/trains');

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body).toEqual(mockTrains);
        });

    });
    describe('POST /trains', () => {
        it('should add a new train', async () => {
            const newTrain = {
                name: 'Express Train',
                type: 'Passenger',
                status: 'Active',
            };
            db.query.mockImplementation((query, params, callback) => {
                callback(null, { insertId: 1 });
            });
    
            const res = await request(app).post('/trains').send(newTrain);
    
            expect(res.statusCode).toBe(201);
            expect(res.body.message).toBe('Train added successfully!');
            expect(res.body.trainId).toBe(1);
      });
    })
    
        
     });
    describe('PUT /trains/:id', () => {
        it('should update an existing train', async () => {
            const updatedTrain = {
                name: 'Updated Train',
                type: 'Freight',
                status: 'Delayed',
            };

            db.query.mockImplementation((query, values, callback) => callback(null, { affectedRows: 1 }));

            const res = await request(app).put('/trains/1').send(updatedTrain);

            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe('Train updated successfully!');
        });

    });
    describe('DELETE /trains/:id', () => {
        it('should delete an existing train', async () => {
            db.query.mockImplementation((query, values, callback) => callback(null, { affectedRows: 1 }));

            const res = await request(app).delete('/trains/1');

            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe('Train deleted successfully.');
        });

    });

