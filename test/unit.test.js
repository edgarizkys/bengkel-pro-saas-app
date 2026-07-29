const request = require('supertest');
const app = require('../app');

describe('Bengkel Pro SaaS API Tests', () => {
  
  describe('GET /api/services', () => {
    it('fetch all services with pagination', async () => {
      const res = await request(app).get('/api/services?page=1&limit=10');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('POST /api/services', () => {
    it('create new service record', async () => {
      const newService = {
        vehicle_plate: 'B 9999 TEST',
        customer_name: 'Budi',
        service_type: 'Ganti Oli',
        mechanic: 'Joko',
        cost: 150000,
        status: 'pending'
      };
      const res = await request(app).post('/api/services').send(newService);
      expect(res.statusCode).toBe(201);
      expect(res.body.vehicle_plate).toBe(newService.vehicle_plate);
    });
  });

  describe('GET /api/inventory', () => {
    it('retrieve inventory list', async () => {
      const res = await request(app).get('/api/inventory');
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeDefined();
    });
  });

  describe('PUT /api/inventory/:id', () => {
    it('update stock level', async () => {
      const updateData = { stock: 15 };
      const res = await request(app).put('/api/inventory/1').send(updateData);
      expect(res.statusCode).toBe(200);
      expect(res.body.stock).toBe(15);
    });
  });

  describe('Error Handling', () => {
    it('return 404 for non-existent route', async () => {
      const res = await request(app).get('/api/invalid-path');
      expect(res.statusCode).toBe(404);
    });

    it('return 400 for invalid data input', async () => {
      const res = await request(app).post('/api/services').send({ cost: 'invalid' });
      expect(res.statusCode).toBe(400);
    });
  });
});