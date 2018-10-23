const path = require('path');
const cp = require('child_process');
const fastify = require('fastify');
const fastifyStatic = require('fastify-static');
const fastifyCors = require('fastify-cors');

const server = fastify({ logger: true });

// setup plugins
server.register(fastifyStatic, { root: path.join(__dirname, '../client/build') });
server.register(fastifyCors);

// serve client file
server.get('/', (request, reply) => reply.sendFile('index.html'));

// health check for making sure still running
server.get('/api/healthcheck', (request, reply) => reply.send(200));

// Spawns new crawler fork to handle long process of crawling sites
server.post('/api/crawl', (request, reply) => {
  let crawler;
  try {
    crawler = cp.fork(path.join(__dirname, '/crawler/index.js'));
    crawler.send(request.body);
    crawler.on('message', (result) => {
      if (result.error) {
        server.log.error(result.error);
        reply.code(500);
      }
      reply.send(result);
      crawler.kill();
    });
  } catch (err) {
    if (crawler) crawler.kill();
    server.log.error(err);
    reply.code(500).send(err);
  }
});

const start = async () => {
  try {
    const port = process.env.PORT || 5000;
    await server.listen(port, '0.0.0.0');
    server.log.info(`server listening on ${server.server.address().port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

if (require.main === module) {
  start();
}

module.exports = server;
