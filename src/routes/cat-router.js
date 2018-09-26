'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('http-errors');

const Cat = require('../model/cat');
const logger = require('../lib/logger');

const jsonParser = bodyParser.json();
const router = module.exports = new express.Router();

const storageById = [];
const storageByHash = {};

router.post('/api/cats', jsonParser, (request, response, next) => {
    if (!request.body.name) {
        return next(new HttpError(400, 'body.name is required'));
    }

    if (!request.body.color) {
        return next(new HttpError(400, 'body.color is required'));
    }

    logger.log(logger.INFO, `name: ${request.body.name}, color: ${request.body.color}`);

    const cat = new Cat(request.body.name, request.body.color);
    storageById.push(cat);
    storageByHash[cat.id] = cat;
    logger.log(logger.INFO, `Responding with a 200 code and json object, storageById: ${storageById}, storageByHash: ${storageByHash}`);
    return response.json(cat);
});

// Following code to call get request in command line
// http localhost:3000/api/cats/f4ca4ed0-c125-11e8-9717-8bf620c6d273

router.get('/api/cats/:id', (request, response, next) => {
    logger.log(logger.INFO, `Trying to get an object with the id ${request.params.id}`);

    if (storageByHash[request.params.id]) {
        logger.log(logger.INFO, 'Responding with a 200 code and json data');
        return response.json(storageByHash[request.params.id]);
    }

    return next(new HttpError(404, 'The cat was not found'));
});

// Following code to call delete request in command line
// curl -X DELETE localhost:3000/api/cats/c4e31fd0-c125-11e8-9717-8bf620c6d273

router.delete('/api/cats/:id', (request, response, next) => {
    logger.log(logger.INFO, `Trying to delete an object with the id ${request.params.id}`);

    if (storageByHash[request.params.id]) {
        logger.log(logger.INFO, 'Responding with a 204 code and json data');

        for (let i = 0; i < storageById.length; i++) {
            if (request.params.id === storageById[i].id) {
                storageById.splice(i, 1);
                delete storageByHash[request.params.id];
            }
        }

        return response.sendStatus(204);
    }

    return next(new HttpError(404, 'The cat was not found'));
});

// Following code to call put request in command line
// curl -X PUT -d name=Romeo localhost:3000/api/cats/b4020770-c126-11e8-a7b5-478511b203d7

router.put('/api/cats/:id', jsonParser, (request, response, next) => {
    logger.log(logger.INFO, `Trying to update an object with id ${request.params.id}`);

    if (storageByHash[request.params.id]) {
        if (request.body.title) {
            storageByHash[request.params.id].title = request.body.title;
        }

        if (request.body.content) {
            storageByHash[request.params.id].content = request.body.content;
        }

        return response.json(storageByHash[request.params.id]);
    }

    return next(new HttpError(404, 'The cat was not found'));
});
