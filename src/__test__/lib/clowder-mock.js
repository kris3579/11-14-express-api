'use strict';

const faker = require('faker');
const Clowder = require('../../model/clowder');

const clowderMock = module.exports = {};

clowderMock.pCreateClowderMock = () => {
  return new Clowder({
    title: faker.lorem.words(5),
    content: faker.lorem.words(5),
  }).save();
};

clowderMock.pCleanClowderMocks = () => {
  return Clowder.remove({});
};
