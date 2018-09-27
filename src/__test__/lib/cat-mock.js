'use strict';

const faker = require('faker');
const Cat = require('../../model/cat');

const catMock = module.exports = {};

catMock.pCreateCatMock = () => {
    return new Cat({
        name: faker.lorem.words(5),
        color: faker.lorem.words(5),
    }).save();
};

catMock.pCleanCatMocks = () => {
    return Cat.remove({});
};
