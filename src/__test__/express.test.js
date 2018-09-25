'use strict';

const superagent = require('superagent');
const faker = require('faker');
const server = require('../lib/server');

process.env.PORT = 3000;
const API_URL = `http://localhost:${process.env.PORT}/api/cats`;

describe('/api/notes', () => {
    beforeAll(server.start);
    afterAll(server.stop);

    test('Should respond with 200 code abd json object if there is a matching id', () => {
        const originalRequest = {
            title: faker.lorem.words(5),
            content: faker.lorem.words(5),
        };

        return superagent.post(API_URL)
            .set('Content-Type', 'application/json')
            .send(originalRequest)
            .then((postResponse) => {
                originalRequest.id = postResponse.body.id;
                return superagent.get(`${API_URL}/${postResponse.body.id}`);
            })
            .then((getResponse) => {
                expect(getResponse.status).toEqual(200);
                expect(getResponse.body.timestamp).toBeTruthy();
                expect(getResponse.body.id).toEqual(originalRequest.id);
                expect(getResponse.body.content).toEqual(originalRequest.content);
                expect(getResponse.body.title).toEqual(originalRequest.title);
            })
    })
})
