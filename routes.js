const entities = require("./api/entities");
const services = require("./api/services");
const line = require("./api/line");


function routes (app) {
  app.use('/api/entities', entities);
  app.use('/api/services', services);
  app.use('/api/line', line);
}

module.exports = routes;