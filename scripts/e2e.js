// https://docs.cypress.io/guides/guides/continuous-integration.html#Module-API
const cypress = require('cypress');

const server = require('../server');
const testServer = require('../testServer');

const command = process.argv.slice(2)[0];

// start the server
return server.start()
  .then(() => {
    // start test server (serves html files to crawl)
    return testServer.start()
      .then(() => {
        // kick off a cypress command (open, run, etc)
        return cypress[command]()
          .then((results) => {
            // stop your server when it's complete
            return server.close()
              .then(() => {
                return testServer.close();
              });
          });
      });
  });
