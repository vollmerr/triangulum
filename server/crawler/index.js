const utils = require('../utils');

const crawlerStuff = async (options) => {
  for (let i = 0; i < 10; i += 1) {
    // console.log('still crawling... pid: ', process.pid);
    if (options.testError) {
      throw new Error('test errorz'); // test throwing an error
    }
    await utils.delay(1000); // eslint-disable-line
  }
  return { nodes: [{ id: 1 }, { id: 2 }] };
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
