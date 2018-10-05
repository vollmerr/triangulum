const path = require('path');
const cp = require('child_process');
const fastify = require('fastify');
const fastifyStatic = require('fastify-static');

const server = fastify({ logger: true });
const port = process.env.PORT || 3000;

// setup plugins
server.register(fastifyStatic, { root: path.join(__dirname, '../client/build') });

// serve client file
server.get('/', (request, reply) => reply.sendFile('index.html'));

// health check for making sure still running
server.get('/api/healthcheck', (request, reply) => reply.send(200));

// Spawns new crawler fork to handle long process of crawling sites
server.post('/api/crawl', (request, reply) => {
  let crawler;
  try {
    crawler = cp.fork('./crawler/index.js');
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

// start API
server.listen(port, (err, address) => {
  if (err) throw err;
  server.log.info(`server listening on ${address}`);
});
