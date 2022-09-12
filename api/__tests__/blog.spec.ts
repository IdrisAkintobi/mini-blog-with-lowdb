import request from 'supertest';
// import app from '../app';
//Lowdb won' allow test to run because it's default to ESM

test('first test', () => {
  expect(request).toBeDefined();
});
