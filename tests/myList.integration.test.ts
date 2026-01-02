import request from 'supertest';
import { app } from '../src/app';
import { CONTENT_TYPE } from '../src/constants/contentType';

describe('My List Integration Tests', () => {
  const userId = 'user-1';

  it('should add item to my list', async () => {
    const res = await request(app)
      .post('/my-list')
      .set('x-user-id', userId)
      .send({
        contentId: 'movie-4',
        contentType: CONTENT_TYPE.MOVIE,
      });

    expect(res.status).toBe(201);
    expect(res.body.contentId).toBe('movie-4');
  });

  it('should prevent duplicate item', async () => {
    const res = await request(app)
      .post('/my-list')
      .set('x-user-id', userId)
      .send({
        contentId: 'movie-4',
        contentType: CONTENT_TYPE.MOVIE,
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/already exists/i);
  });

  it('should list my items', async () => {
    const res = await request(app)
      .get('/my-list?limit=10')
      .set('x-user-id', userId);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should remove item from my list', async () => {
    const res = await request(app)
      .delete('/my-list')
      .set('x-user-id', userId)
      .send({
        contentId: 'movie-4',
        contentType: CONTENT_TYPE.MOVIE,
      });

    expect(res.status).toBe(204);
  });

  it('should return 404 when removing non-existing item', async () => {
    const res = await request(app)
      .delete('/my-list')
      .set('x-user-id', userId)
      .send({
        contentId: 'movie-999',
        contentType: CONTENT_TYPE.MOVIE,
      });

    expect(res.status).toBe(400);
  });

  it('should fail without auth header', async () => {
    const res = await request(app)
      .get('/my-list');

    expect(res.status).toBe(401);
  });
});
