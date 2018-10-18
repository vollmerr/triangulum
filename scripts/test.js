const resolve = require('path').resolve;
const cp = require('child_process');
const os = require('os');
const chalk = require('chalk');

const runTests = ({ type }) => {
  const cwd = resolve(__dirname, '..', type);
  console.log(chalk.magenta(`Testing ${type}\n`));
  // npm binary based on OS
  const npmCmd = os.platform().startsWith('win') ? 'npm.cmd' : 'npm';
  const env = {
    ...process.env,
    CI: true, // set CI to force coverage report in create-react-app
    FORCE_COLOR: true, // make it look nice :)
  };
  return cp.spawn(npmCmd, ['run', 'test'], { env, cwd, stdio: 'inherit' });
};

runTests({ type: 'client' })
  .on('exit', () => runTests({ type: 'server' }));
