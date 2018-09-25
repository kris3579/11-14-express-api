'use strict';

process.env.PORT = 3000;

const faker = require('faker');
const superagent = require('superagent');
const server = require('../lib/server');

//! Vinicio - setting up the testing port, by HAND
const API_URL = `http://localhost:${process.env.PORT}/api/notes`;

describe('/api/cats', () => {
    beforeAll(server.start);
    afterAll(server.stop);

    // test('should respond with 200 status code and a new json note', () => {
    //     return superagent.post(API_URL)
    //         .set('Content-Type', 'application/json')
    //         .send({
    //             title: 'Gregor',
    //             content: 'is cute',
    //         })
    //         .then((response) => {
    //             expect(response.status).toEqual(200);
    //             expect(response.body.content).toEqual('is cute');
    //             expect(response.body.title).toEqual('Gregor');
    //             expect(response.body.timestamp).toBeTruthy();
    //             expect(response.body.id).toBeTruthy();
    //         });
    // });
    // test('should respond with 400 status code if there is no title', () => {
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

    test('should respond with 200 status code and a json note if there is a matching id', () => {
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
                expect(getResponse.body.title).toEqual(originalRequest.title);
            });
    });
});
