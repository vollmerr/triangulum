const path = require('path');
const fastify = require('fastify');
const fastifyStatic = require('fastify-static');

const server = fastify({ logger: false });

// setup plugins
server.register(fastifyStatic, { root: path.join(__dirname, './html' ) });

server.start = () => {
  const port = 9119;
  return server.listen(port, '0.0.0.0')
    .catch(console.error);
};

if (require.main === module) {
  server.start();
}

module.exports = server;
