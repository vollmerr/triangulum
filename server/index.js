const path = require('path');
const cp = require('child_process');
const fastify = require('fastify');
const fastifyStatic = require('fastify-static');
const fastifyCors = require('fastify-cors');
const fastifyWs = require('fastify-ws');

const server = fastify({ logger: true });

// setup plugins
server.register(fastifyStatic, { root: path.join(__dirname, '../client/build') });
server.register(fastifyCors);
server.register(fastifyWs);

/** ******************************
 *  HTTP SERVER
 ** ****************************** */

// serve client file
server.get('/', (request, reply) => reply.sendFile('index.html'));

// health check for making sure still running
server.get('/api/healthcheck', (request, reply) => reply.send(200));

/** ******************************
 *  WEB SOCKET SERVER
 ** ****************************** */
function noop() {}

function heartbeat() {
  this.isAlive = true;
}

server.ready((err) => {
  if (err) throw err;
  server.log.info('server started');

  server.ws.on('connection', (ws) => {
    server.log.info('Client connected.');
    ws.isAlive = true; // eslint-disable-line
    // keep alive with ping pongs
    ws.on('pong', heartbeat);
    // recieved a request to crawl
    ws.on('message', (msg) => {
      server.log.info('Message recieved');
      let crawler;
      try {
        crawler = cp.fork(path.join(__dirname, '/crawler/index.js'));
        crawler.send(JSON.parse(msg));
        crawler.on('message', (result) => {
          try {
            if (result.error) {
              throw result.error;
            }
            ws.send(JSON.stringify(result));
          } catch (crawlError) {
            server.log.error(crawlError);
          } finally {
            if (crawler) crawler.kill();
          }
        });
      } catch (wsError) {
        server.log.error(wsError);
        ws.send(wsError);
        if (crawler) crawler.kill();
      }
    });
    // close out connection
    ws.on('close', () => server.log.info('Client disconnected.'));
  });
});

// ping clients to make sure still alive
setInterval(() => {
  server.ws.clients.forEach((ws) => {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false; // eslint-disable-line
    return ws.ping(noop);
  });
}, 30000);

server.start = async () => {
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
  server.start();
}

module.exports = server;
