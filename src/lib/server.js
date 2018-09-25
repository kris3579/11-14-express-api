'use strict';

const express = require('express');
const logger = require('./logger');

const catRoutes = require('../routes/cat-router');

const app = express();

app.use(catRoutes);

app.all('*', (request, response) => {
    logger.log(logger.INFO, 'Returning 404 from catch-all/default route');
    return response.sendStatus(404);
});

const server = module.exports = {}

let internalServer= null;

server.start = (process.env.PORT) => {
    internalServer = app.listen(port, () => {
        logger.log(logger.INFO, `Server up on PORT: ${process.env.PORT}`);
    });
    return internalServer;
};

server.stop = (callback) => {
    internalServer.close(() => {
        logger.log(logger.INFO, 'Server is OFF');
    })
};