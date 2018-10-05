const utils = require('../utils');

const crawlerStuff = async (options) => {
  // wait 1sec 10 times
  for (let i = 0; i < 10; i += 1) {
    console.log('still crawling... pid: ', process.pid);
    if (options.testError) {
      throw new Error('test errorz'); // test throwing an error
    }
    await utils.delay(1000); // eslint-disable-line
  }
  return 'result of crawling..';
};

process.on('message', async (options) => {
  try {
    const result = await crawlerStuff(options);
    process.send(result);
  } catch (err) {
    // parent process expects an 'error' property on response if error
    process.send({ error: err.message || 'Something Broke!' });
  }
});
