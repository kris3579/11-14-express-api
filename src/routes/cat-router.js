'use strict';

const Cat = require('../model/cat')
const logger = require('../lib/logger');
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = module.exports = new express.Router();

const storageById = [];
const storageByHash = {};

router.post('/api/cats', jsonParser, (request, response) => {
    if (!request.body.name) {
        logger.log(logger.INFO, 'Responding with 400 code, no body.name');
        return response.sendStatus(400);
    }

    if (!request.body.color) {
        logger.log(logger.INFO, 'Responding with 400 code, no body.color');
        return response.sendStatus(400);
    }

    logger.log(logger.INFO, `name: ${request.body.name}, color: ${request.body.color}`);

    const cat = new Cat(request.body.name, request.body.color);
    storageById.push(cat);
    storageByHash[cat.id] = cat;
    logger.log(logger.INFO, `Responding with a 200 code and json object, storageById: ${storageById}, storageByHash: ${storageByHash}`);
    return response.json(cat);
});

//http localhost:3000/api/note/<id-recieved-from-post>

router.get('/api/cats', (request, response) => {
    logger.log(logger.INFO, `Trying to get an object with the id ${request.params.id}`);

    if (storageByHash[request.params.id]) {
        looger.log(logger.INFO, 'Responsding with a 200 cide abd json data');
        return response.json(storageByHash[request.params.id]);
    }

    logger.log(logger.INFO, 'Responding with 404 code')
    response.sendStatus(404);
});
