import request from 'supertest';
import { app } from '../src/app';
import { CONTENT_TYPE } from '../src/constants/contentType';

describe('My List Integration Tests', () => {
  const userId = 'user_001';

  describe('POST /my-list - Add Item', () => {
    it('should add item to my list', async () => {
      const res = await request(app)
        .post('/my-list')
        .set('x-user-id', userId)
        .send({
          contentId: 'movie_004',
          contentType: 'movie',
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.contentId).toBe('movie_004');
      expect(res.body.data.contentType).toBe('movie');
      expect(res.body.data.addedAt).toBeDefined();
    });

    it('should prevent duplicate item', async () => {
      const res = await request(app)
        .post('/my-list')
        .set('x-user-id', userId)
        .send({
          contentId: 'movie_004',
          contentType: 'movie',
        });

      expect(res.status).toBe(409);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/already exists/i);
    });

    it('should fail with invalid contentId format', async () => {
      const res = await request(app)
        .post('/my-list')
        .set('x-user-id', userId)
        .send({
          contentId: 'invalid_id',
          contentType: 'movie',
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should fail with non-existent content', async () => {
      const res = await request(app)
        .post('/my-list')
        .set('x-user-id', userId)
        .send({
          contentId: 'movie_999',
          contentType: 'movie',
        });

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/not found/i);
    });
  });

  describe('GET /my-list - List Items', () => {
    it('should list my items with content details', async () => {
      const res = await request(app)
        .get('/my-list?limit=10')
        .set('x-user-id', userId);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.pagination).toBeDefined();
      expect(typeof res.body.pagination.total).toBe('number');

      if (res.body.data.length > 0) {
        const item = res.body.data[0];
        expect(item.contentId).toBeDefined();
        expect(item.contentType).toBeDefined();
        expect(item.content).toBeDefined();
        expect(item.content.title).toBeDefined();
      }
    });

    it('should handle pagination', async () => {
      const res = await request(app)
        .get('/my-list?page=1&limit=5')
        .set('x-user-id', userId);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.pagination.page).toBe(1);
      expect(res.body.pagination.limit).toBe(5);
    });
  });

  describe('DELETE /my-list - Remove Item', () => {
    it('should remove item from my list', async () => {
      const res = await request(app)
        .delete('/my-list')
        .set('x-user-id', userId)
        .send({
          contentId: 'movie_004',
          contentType: 'movie',
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toMatch(/removed/i);
    });

    it('should return 404 when removing non-existing item', async () => {
      const res = await request(app)
        .delete('/my-list')
        .set('x-user-id', userId)
        .send({
          contentId: 'movie_999',
          contentType: 'movie',
        });

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/not found/i);
    });
  });

  describe('Authentication', () => {
    it('should fail without auth header', async () => {
      const res = await request(app)
        .get('/my-list');

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should fail with invalid user ID format', async () => {
      const res = await request(app)
        .get('/my-list')
        .set('x-user-id', 'invalid_user');

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe('Validation', () => {
    it('should validate contentType', async () => {
      const res = await request(app)
        .post('/my-list')
        .set('x-user-id', userId)
        .send({
          contentId: 'movie_001',
          contentType: 999, // Invalid content type
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should validate pagination parameters', async () => {
      const res = await request(app)
        .get('/my-list?page=-1&limit=200')
        .set('x-user-id', userId);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});
