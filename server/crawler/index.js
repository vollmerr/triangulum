const crawlerStuff = () => new Promise(res => setTimeout(res, 1000));

process.on('message', async () => {
  const result = await crawlerStuff();
  process.send(result);
});
