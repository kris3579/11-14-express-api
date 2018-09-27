'use strict';

const express = require('express');
const mongoose = require('mongoose');
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
    console.log(process.env);
    return mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            return internalServer = app.listen(process.env.PORT, () => {
                logger.log(logger.INFO, `Server up on PORT: ${process.env.PORT}`);
            });
        });
};

server.stop = () => {
    return mongoose.disconnect()
        .then(() => {
            return internalServer.close(() => {
                logger.log(logger.INFO, 'Server is OFF');
            });
        });
};
