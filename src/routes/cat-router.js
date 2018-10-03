'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('http-errors');

const Cat = require('../model/cat');
const logger = require('../lib/logger');

const jsonParser = bodyParser.json();
const router = module.exports = new express.Router();

router.post('/api/cats', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, 'Trying to post a cat');
  return new Cat(request.body).save()
    .then((savedCat) => {
      logger.log(logger.INFO, 'Responding with 200 code');
      return response.json(savedCat);
    })
    .catch(next);
});

// router.get('/api/cats/:id', (request, response, next) => {
//     logger.log(logger.INFO, `Trying to find a cat with the id ${request.params.id}`)
//     return Cat.findById(request.params.id)
//         .then((cat) => {
//             if(cat) {
//                 logger.log(logger.INFO, 'Responding with 200 code and a Cat');
//                 return response.json(cat);
//             }
//             logger.log(logger.INFO, 'Responding with a 404 code, cat not found');
//             return next(new HttpError(404, 'Cat not found'))
//         })
//         .catch(next);
// });

// router.delete('api/cats/:id', (request, response, next) => {
//     logger.log(logger.INFO, `Trying to delete an object with the id ${request.params.id}`);
//     return Cat.findByIdAndDelete(request.params.id)
//         .then(() => {
//             return response.sendStatus(204)
//         })
//         .catch(next);
//     return next(new HttpError(404, 'The cat was not found'));
// });

router.put('api/cats/:id', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, `Trying to update an object with id ${request.params.id}`);
  const updateOptions = {
    runValidators: true,
    new: true,
  };
  return Cat.findByIdAndUpdate(request.params.id, request.body, updateOptions)
    .then((updatedCat) => {
      if (!updatedCat) {
        logger.log(logger.INFO, 'Responding with a 404 code, cat not found');
        return next(new HttpError(404, 'Cat not found'));
      }
      logger.log(logger.INFO, 'Responding with 200 code and an updated Cat');
      return response.json(updatedCat);
    })
    .catch(next);
});
