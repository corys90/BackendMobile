const { server } = require("./app");

const port = process.env.PORT || 65535;

server.listen(port, () => {
  console.log(`Servidor escuchando por puerto ${port}`);
});

module.exports = server;
