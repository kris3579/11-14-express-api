'use strict';

const faker = require('faker');
const superagent = require('superagent');
const server = require('../lib/server');
const catMock = require('./lib/cat-mock');
const testEnv = require('./lib/test.env');?

const API_URL = `http://localhost:${process.env.PORT}/api/cats`;

describe('/api/cats', () => {
    beforeAll(server.start);
    afterAll(server.stop);
    beforeEach(catMock.pCleanCatMocks);

    test('POST, should respond with 200 status code and a new json note', () => {
        const originalRequest = {
                    name: faker.lorem.words(5),
                    color: faker.lorem.words(5),
                };
        return superagent.post(API_URL)
            .set('Content-Type', 'application/json')
            .send(originalRequest)
            .then((response) => {
                expect(response.status).toEqual(200);
                expect(response.body.color).toEqual(originalRequest.color);
                expect(response.body.name).toEqual(originalRequest.name);
                expect(response.body._id).toBeTruthy();
            });
    });
    //
    // test('POST, should respond with 400 status code if there is no title', () => {
    //     return superagent.post(API_URL)
    //         .set('Content-Type', 'application/json')
    //         .send({
    //             content: 'is cute',
    //         })
    //         .then(Promise.reject)
    //         .catch((response) => {
    //             expect(response.status).toEqual(400);
    //         });
    // });
    //
    // test('GET, should respond with 200 status code and a json note if there is a matching id', () => {
    //     const originalRequest = {
    //         name: faker.lorem.words(5),
    //         color: faker.lorem.words(5),
    //     };
    //     return superagent.post(API_URL)
    //         .set('Content-Type', 'application/json')
    //         .send(originalRequest)
    //         .then((postResponse) => {
    //             originalRequest.id = postResponse.body.id;
    //             return superagent.get(`${API_URL}/${postResponse.body.id}`);
    //         })
    //         .then((getResponse) => {
    //             expect(getResponse.status).toEqual(200);
    //             expect(getResponse.body.id).toEqual(originalRequest.id);
    //             expect(getResponse.body.title).toEqual(originalRequest.title);
    //         });
    // });

    // test('GET, should respond with 404 for an id that could not be found', () => {
    //     const originalRequest = {
    //         name: faker.lorem.words(5),
    //         color: faker.lorem.words(5),
    //     };
    //     return superagent.post(API_URL)
    //         .set('Content-Type', 'application/json')
    //         .send(originalRequest)
    //         .then((postResponse) => {
    //             originalRequest.id = postResponse.body.id;
    //             return superagent.get(`${API_URL}/b4020770-c126-11e8-a7b5-478511b203d7`)
    //         })
    //         .then((getResponse) => {
    //             expect(getResponse.status).toEqual(404);
    //         });
    // });

    // test('DELETE, should respond with 204 if we remove a note', () => {
    //     const originalRequest = {
    //         name: faker.lorem.words(5),
    //         color: faker.lorem.words(5),
    //     };
    //     return superagent.post(API_URL)
    //         .set('Content-Type', 'application/json')
    //         .send(originalRequest)
    //         .then((postResponse) => {
    //             originalRequest.id = postResponse.body.id;
    //             return superagent.delete(`${API_URL}/${postResponse.body.id}`);
    //         })
    //         .then((getResponse) => {
    //             expect(getResponse.status).toEqual(204);
    //         });
    // });
    //
    // test('DELETE, should respond with 404 if there is no note to remove', () => {
    //     return superagent.delete(`${API_URL}/invalidID-gregor-is-cute`)
    //         .then(Promise.reject)
    //         .catch((getResponse) => {
    //             expect(getResponse.status).toEqual(404);
    //         });
    // });

    // test('PUT, should respond with 204 if we updated a note', () => {
    //     const originalRequest = {
    //         name: faker.lorem.words(5),
    //         color: faker.lorem.words(5),
    //     };
    //     return superagent.post(API_URL)
    //         .set('Content-Type', 'application/json')
    //         .send(originalRequest)
    //         .then((postResponse) => {
    //             originalRequest.id = postResponse.body.id;
    //             return superagent.put(`${API_URL}/${postResponse.body.id}`)
    //                 .send({
    //                     name: 'Gregor',
    //                 });
    //         })
    //         .then((putResponse) => {
    //             expect(putResponse.status).toEqual(200);
    //             expect(putResponse.body.id).toEqual(originalRequest.id);
    //             expect(putResponse.body.title).toEqual('Gregor');
    //             expect(putResponse.body.content).toEqual(originalRequest.content);
    //         });
    // });
});
