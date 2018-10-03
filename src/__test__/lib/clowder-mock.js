'use strict';

const faker = require('faker');
const Clowder = require('../../model/clowder');

const clowderMock = module.exports = {};

clowderMock.pCreateClowderMock = () => {
  return new Clowder({
    name: faker.lorem.words(5),
    // timeStamp: new Date(),
  }).save();
};

clowderMock.pCleanClowderMocks = () => {
  return Clowder.remove({});
};
