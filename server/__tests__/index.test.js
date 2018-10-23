const request = require('supertest');

const fastify = require('../index');

beforeAll(async () => {
  await fastify.ready();
});

afterAll(() => {
  fastify.close();
});

describe('server', () => {
  describe('GET /', () => {
    xit('should send the client', () => {

    });
  });

  describe('GET /api/healthcheck', () => {
    it('should return a `200`', async () => {
      await request(fastify.server)
        .get('/api/healthcheck')
        .expect(200);
    });
  });
});
