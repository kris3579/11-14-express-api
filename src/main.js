'use strict';

require('dotenv').config();

console.log(process.env.PORT);

const server = require('./lib/server');

server.start();
