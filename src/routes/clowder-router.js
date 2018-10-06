'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('http-errors');

const Clowder = require('../model/clowder');
const logger = require('../lib/logger');

const jsonParser = bodyParser.json();
const router = module.exports = new express.Router();

router.post('/api/clowders', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, 'Trying to post a clowder');
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

router.delete('/api/clowders/:id', (request, response, next) => {
  logger.log(logger.INFO, `Trying to delete an clowder with the id ${request.params.id}`);
  console.log('here');
  return Clowder.findById(request.params.id)
    .then((foundClowder) => {
      console.log('Made it inside .then');
      if (!foundClowder) {
        return next(new HttpError(404, 'Could not find a clowder to delete'));
      }
      return foundClowder.remove();
    })
    .then(() => {
      logger.log(logger.INFO, 'Responding with a 204, clowder deleted');
      return response.sendStatus(204);
    })
    .catch(next);
});

router.put('/api/clowders/:id', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, `Trying to update a clowder with id ${request.params.id}`);
  const updateOptions = {
    runValidators: true,
    new: true,
  };
  return Clowder.findByIdAndUpdate(request.params.id, request.body, updateOptions)
    .then((updatedClowder) => {
      if (!updatedClowder) {
        logger.log(logger.INFO, 'Responding with a 404 code, clowder not found');
        return next(new HttpError(404, 'Clowder not found'));
      }
      logger.log(logger.INFO, 'Responding with 200 code and an updated clowder');
      return response.json(updatedClowder);
    })
    .catch(next);
});
