'use strict';

const http = require('http');
const Router = require('./router');

const router = new Router();

const app = http.createServer(router.route());
require('../route/route-dragon')(router);

const server = module.exports = {};
server.start = (port, callback) => app.listen(port, callback);
server.stop = callback => app.close(callback);
