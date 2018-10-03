'use strict';

// const superagent = require('superagent');
// const server = require('../lib/server');
// const catMock = require('./lib/cat-mock');
//
// const API_URL = `http://localhost:${process.env.PORT}/api/cats`;

// describe('/api/clowders', () => {
//   beforeAll(server.start);
//   afterAll(server.stop);
//   beforeEach(catMock.pCleanCatMocks);
//
//   test('should respond with 200 status and an updated card', () => {
//     let savedMock;
//
//     return catMock.pCreateCatMock()
//       .then((mock) => {
//         savedMock = mock;
//         return superagent.put(`${API_URL}/${mock.cat._id}`)
//           .send({
//             title: 'Updated Title',
//           });
//       })
//       .then((response) => {
//         expect(response.status).toEqual(200);
//         expect(response.body.content).toEqual(savedMock.cat.content);
//         expect(response.body.title).toEqual('Updated Title');
//         expect(response.body.clowder.toString()).toEqual(savedMock.clowder._id.toString());
//       });
//   });
// });
