const entities = require("./api/entities");
const services = require("./api/services");
const line = require("./api/line");
const auth = require("./auth");


function routes (app) {
  app.use('/api/entities', entities);
  app.use('/api/services', services);
  app.use('/api/line', line);
  app.use('/', auth);
}

module.exports = routes;