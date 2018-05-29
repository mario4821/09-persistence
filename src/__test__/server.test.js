'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockResource = { title: 'test title', content: 'test content' };
const mockId = null;

beforeAll(() => server.start(testPort));
afterAll(() => server.stop());

describe('VALID request to the API', () => {
  describe('POST /api/v1/dragon', () => {
    it('should respond with status 201 and create a new dragon', () => {
    return superagent.post(`:${testPort}/api/v1/dragon`)
      .send(mockResource)
      .then((res) => {
        expect(res.body.title).toEqual(mockResource.title);
        expect(res.body.content).toEqual(mockResource.content);
        expect(res.status).toEqual(201);
      });
  });
});

  describe('GET /api/v1/dragon', () => {
    it('should respond with a previously created dragon', () => {
      return superagent.get(`:${testPort}/api/v1/dragon?id=${mockId}`)
      .then((res) => {
        expect(res.body.title).toEqual(mockResource.title);
        expect(res.body.content).toEqual(mockResource.content);
        expect(res.status).toEqual(200);
      });
    });
  });
});

describe('INVALID request to the API', () => {
  describe('GET /api/v1/dragon', () => {
    it('should err out with 404 status code for not sending anything', () => {
      return superagent.get(`:${testPort}/api/v1/dragon`)
      .query({})
      .then(() => {})
      .catch((err) => {
        expect(err.status).toEqual(404);
        expect(err).toBeTruthy();
      });
  });
});

  describe('GET: /api/v1/dragon', () => {
    it('should respond with not found if id was not found', () => {
      return superagent.get(`:${testPort}/api/v1/dragon?id=5`)
      .query({})
      .catch((err) => {
        expect(err.status).toEqual(404);
        expect(err).toBeTruthy();
      });
  });

  it('should err out with 404 status code for invalid id', () => {
    return superagent.get(`:${testPort}/api/v1/dragon?id=`)
    .query({})
    .catch((err) => {
      expect(err.status).toEqual(404);
      expect(err).toBeTruthy();
    });
  });

  it('should err out with 400 status code for non-existent id', () => {
    return superagent.get(`:${testPort}/api/v1/dragon?id=`)
    .query({})
    .catch((err) => {
      expect(err.status).toEqual(400);
      expect(err).toBeTruthy();
      });
    });
  });
});

