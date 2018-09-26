'use strict';

const express = require('express');
const logger = require('./logger');
const loggerMiddleware = require('./logger-middleware');
const errorMiddleware = require('./error-middleware');

const catRoutes = require('../routes/cat-router');

const app = express();

app.use(loggerMiddleware);

app.use(catRoutes);

app.all('*', (request, response) => {
    logger.log(logger.INFO, 'Returning 404 from catch-all/default route');
    return response.sendStatus(404);
});

app.use(errorMiddleware);

const server = module.exports = {}

let internalServer= null;

server.start = () => {
    internalServer = app.listen(process.env.PORT, () => {
        logger.log(logger.INFO, `Server up on PORT: ${process.env.PORT}`);
    });
    return internalServer;
};

server.stop = () => {
    internalServer.close(() => {
        logger.log(logger.INFO, 'Server is OFF');
    })
};
