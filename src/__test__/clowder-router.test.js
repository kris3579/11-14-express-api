'use strict';

const faker = require('faker');
const superagent = require('superagent');
const server = require('../lib/server');
const clowderMock = require('./lib/clowder-mock');

const API_URL = `http://localhost:${process.env.PORT}/api/clowders`;

describe('/api/clowders', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  beforeEach(clowderMock.pCleanClowderMocks);

  test('POST, should respond with 200 status code and a new json note', () => {
    const originalRequest = {
      name: faker.lorem.words(3),
    };

    return superagent.post(API_URL)
      .set('Content-Type', 'application/json')
      .send(originalRequest)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(originalRequest.name);
        expect(response.body.timeStamp).toBeTruthy();
        expect(response.body._id.toString()).toBeTruthy();
      });
  });

  test('GET, should respond with 200 status code and a json note if there is a matching id', () => {
    let savedClowderMock = null;
    return clowderMock.pCreateClowderMock()
      .then((createdClowderMock) => {
        savedClowderMock = createdClowderMock;
        console.log(`${API_URL}/${createdClowderMock._id}`);
        return superagent.get(`${API_URL}/${createdClowderMock._id}`);
      })
      .then((getResponse) => {
        expect(getResponse.status).toEqual(200);
        expect(getResponse.body.timestamp).toBeTruthy();
        expect(getResponse.body._id.toString()).toEqual(savedClowderMock._id.toString());
        expect(getResponse.body.name).toEqual(savedClowderMock.name);
      });
  });

  test('DELETE, should respond with 204 status code and delete the clowder if there is a matching id', () => { //eslint-disable-line
    return clowderMock.pCreateClowderMock()
      .then((createdClowderMock) => {
        console.log(createdClowderMock);
        return superagent.delete(`${API_URL}/${createdClowderMock._id}`);
      })
      .then((deleteResponse) => {
        expect(deleteResponse.status).toEqual(204);
      });
  });

  test('PUT, should respond with 200 status code and an updated clowder if there is a matching id', () => {
    let savedClowderMock = null;
    return clowderMock.pCreateClowderMock()
      .then((createdClowderMock) => {
        savedClowderMock = createdClowderMock;
        return superagent.put(`${API_URL}/${createdClowderMock._id}`);
      })
      .then((putResponse) => {
        expect(putResponse.status).toEqual(200);
        expect(putResponse.body.timestamp).toBeTruthy();
        expect(putResponse.body._id.toString()).toEqual(savedClowderMock._id.toString());
        expect(putResponse.body.name).not.toEqual(savedClowderMock.name);
      });
  });
});
