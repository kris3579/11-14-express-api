'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('http-errors');

const Clowder = require('../model/clowder');
const logger = require('../lib/logger');

const jsonParser = bodyParser.json();
const router = module.exports = new express.Router();

router.post('/api/clowders', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, 'Trying to post a cat');
  return new Clowder(request.body).save()
    .then((savedClowder) => {
      logger.log(logger.INFO, 'Responding with 200 code');
      return response.json(savedClowder);
    })
    .catch(next);
});

router.get('/api/clowders/:id', (request, response, next) => {
  logger.log(logger.INFO, `Trying to find a clowder with the id ${request.params.id}`);
  return Clowder.findById(request.params.id)
    .then((clowder) => {
      if (clowder) {
        logger.log(logger.INFO, 'Responding with 200 code and a clowder');
        return response.json(clowder);
      }
      logger.log(logger.INFO, 'Responding with a 404 code, clowder not found');
      return next(new HttpError(404, 'Clowder not found'));
    })
    .catch(next);
});
