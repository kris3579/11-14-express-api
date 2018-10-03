'use strict';

const faker = require('faker');
const clowderMock = require('./clowder-mock');
const Cat = require('../../model/cat');

const catMock = module.exports = {};

catMock.pCreateCatMock = () => {
  const resultMock = {};

  return clowderMock.pCreateClowderMock()
    .then((createdClowderMock) => {
      resultMock.clowder = createdClowderMock;

      return new Cat({
        name: faker.lorem.words(5),
        color: faker.lorem.words(5),
      }).save();
    })
    .then((createdCatMock) => {
      resultMock.cat = createdCatMock;
      return resultMock;
    });
};

catMock.pCleanCatMocks = () => {
  return Promise.all([
    Cat.remove({}),
    clowderMock.pCleanClowderMocks(),
  ]);
};
