'use strict';

const logger = require('./logger');
const requestParser = require('./request-parser');

const routeHandlers = {
  POST: {},
  GET: {},
  GETALL: {},
};

const router = module.exports = {};

const logRouteAndCallback = (method, route) => {
  logger.log(logger.INFO, `Adding a ${method} handler on the ${route} route`);
};

router.get = (route, callback) => {
  routeHandlers.GET[route] = callback;
  logRouteAndCallback('GET', route);
};

router.post = (route, callback) => {
  routeHandlers.POST[route] = callback;
  logRouteAndCallback('POST', route);
};

router.getAll = (route, callback) => {
  routeHandlers.GETALL[route] = callback;
  logRouteAndCallback('GET ALL', route);
};

router.findAndExecuteRoutes = (request, response) => {
  logger.log(logger.INFO, 'Routing a request');

  requestParser.parseAsync(request)
    .then((parsedRequest) => {
      const handler = routeHandlers[parsedRequest.method][parsedRequest.url.pathname];
        logger.log(logger.INFO, 'Made it into requestParser.parseAsync.then');
      if (handler) {
        return handler(parsedRequest, response);
      }

      response.writeHead(404);
      response.end();
      return null;
    }).catch(() => {
      logger.log(logger.INFO, 'Responding with 400 code!!');
      response.writeHead(400, { 'Content-Type': 'text/plain' });
      response.write('Bad Request');
      response.end();
      return null;
    });
};
